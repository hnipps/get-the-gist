import { h, render, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { getCodeBlocks, setupCreateGist } from './utils';
import Gist from './components/gist/Gist';
import List from './components/list/List';
import ListItem from './components/list/components/ListItem';
import Login from './components/login/Login';
import Header from './components/header/Header';
import Accordion from './components/accordion/Accordion';
import CreateGistForm from './components/create-gist-form/CreateGistForm';
import Footer from './components/footer/footer';

import './popup.css';

const Octokit = require('@octokit/rest');

const signOut = setAccessToken => () =>
  chrome.storage.local.remove('accessToken', () => setAccessToken(undefined));

const App = () => {
  const [accessToken, setAccessToken] = useState(undefined);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [codeBlocks, setCodeBlocks] = useState();
  const [error, setError] = useState();
  const [snippetListStatus, setSnippetListStatus] = useState(
    'No snippets found.',
  );
  const [selectedSnippets, setSelectedSnippets] = useState([]);
  chrome.storage.local.get('accessToken', ({ accessToken }) =>
    setAccessToken(accessToken),
  );

  let octokit;
  if (accessToken) {
    octokit = Octokit({
      auth: accessToken,
      userAgent: 'get-the-gist v1.0.0',
      log: console,
    });
  }

  const handleLogin = e => {
    e.preventDefault();
    setIsLoggingIn(true);

    var port = chrome.runtime.connect({ name: 'login' });
    port.postMessage({ action: 'login' });
    port.onMessage.addListener(function(msg) {
      setIsLoggingIn(false);
    });
  };

  const handleCreateGistClick = codeBlock => {
    return fileName => event => {
      event.preventDefault();

      setupCreateGist(octokit)({
        [fileName]: { content: codeBlock.code },
      }).then(({ data: { html_url: url } }) => {
        const updatedGist = { ...codeBlock, url };
        const filteredCodeBlocks = codeBlocks.filter(
          item => item.id !== codeBlock.id,
        );
        const updatedCodeBlocks = [...filteredCodeBlocks, updatedGist].sort(
          (a, b) => a.order - b.order,
        );
        setCodeBlocks(updatedCodeBlocks);
      });
    };
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSnippetListStatus('Looking for code snippets...');
    getCodeBlocks(setCodeBlocks, setError).then(() => {
      console.log('Stop refreshing!');

      setIsRefreshing(false);
    });
  };

  const handleAddSnippet = codeBlock => () => {
    console.log('Adding!');
    const newSelectedSnippets = [...selectedSnippets, codeBlock].sort(
      (a, b) => a.order - b.order,
    );
    setSelectedSnippets(newSelectedSnippets);
  };

  const handleRemoveSnippet = codeBlock => () => {
    console.log('Removing!');

    const newSelectedSnippets = selectedSnippets
      .filter(snip => snip.id !== codeBlock.id)
      .sort((a, b) => a.order - b.order);
    setSelectedSnippets(newSelectedSnippets);
  };

  return (
    <main className="popup__wrapper">
      {accessToken ? (
        <div className="popup__main-content-wrapper">
          <Header onRefresh={handleRefresh} loading={isRefreshing} />
          {error && <p>{error}</p>}
          <List>
            {codeBlocks ? (
              <>
                {codeBlocks.map(codeBlock => (
                  <ListItem>
                    <Accordion
                      header={
                        <CreateGistForm
                          onCreateClick={handleCreateGistClick(codeBlock)}
                          onAddSnippetClick={handleAddSnippet(codeBlock)}
                          onRemoveSnippetClick={handleRemoveSnippet(codeBlock)}
                        />
                      }
                    >
                      <Gist code={codeBlock.code} url={codeBlock.url} />
                    </Accordion>
                  </ListItem>
                ))}
                <ListItem>
                  <Footer snippetCount={selectedSnippets.length} />
                </ListItem>
              </>
            ) : (
              <ListItem>{snippetListStatus}</ListItem>
            )}
          </List>
        </div>
      ) : (
        <Login onLogin={handleLogin} loading={isLoggingIn} />
      )}
    </main>
  );
};

// Inject our app into the DOM
render(<App />, document.body);
