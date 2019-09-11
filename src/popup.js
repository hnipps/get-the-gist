import { h, render, Fragment } from 'preact';
import { useState, useCallback } from 'preact/hooks';
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
  const [snippetList, setSnippetList] = useState();
  const [error, setError] = useState();
  const [snippetListStatus, setSnippetListStatus] = useState(
    'No snippets found.',
  );
  const [selectedSnippets, setSelectedSnippets] = useState([]);
  const [gistDescription, setGistDescription] = useState();
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

  const handleCreateGistClick = (snippets, description) => event => {
    event.preventDefault();

    const files = snippets.reduce(
      (acc, { filename, code }, i) => ({
        ...acc,
        [filename || `file${i}`]: { content: code },
      }),
      {},
    );

    console.log(files);

    setupCreateGist(octokit)(files, description).then(
      ({ data: { html_url: url } }) => {
        console.log(url);
      },
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSnippetListStatus('Looking for code snippets...');
    getCodeBlocks(setSnippetList, setError).then(() => {
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

  const handleGistDescriptionChange = useCallback(ev =>
    setGistDescription(ev.target.value),
  );

  const handleSnippetFilenameChange = codeBlock =>
    useCallback(ev => {
      const newSnippets = [
        ...snippetList.filter(block => block.id !== codeBlock.id),
        { ...codeBlock, filename: ev.target.value },
      ].sort((a, b) => a.order - b.order);
      setSnippetList(newSnippets);
    });

  return (
    <main className="popup__wrapper">
      {accessToken ? (
        <div className="popup__main-content-wrapper">
          <Header onRefresh={handleRefresh} loading={isRefreshing} />
          {error && <p>{error}</p>}
          <List>
            {snippetList ? (
              <>
                {snippetList.map(codeBlock => (
                  <ListItem>
                    <Accordion
                      header={
                        <CreateGistForm
                          onAddSnippetClick={handleAddSnippet(codeBlock)}
                          onRemoveSnippetClick={handleRemoveSnippet(codeBlock)}
                          onFilenameChange={handleSnippetFilenameChange(
                            codeBlock,
                          )}
                          filename={codeBlock.filename}
                        />
                      }
                    >
                      <Gist code={codeBlock.code} url={codeBlock.url} />
                    </Accordion>
                  </ListItem>
                ))}
                <ListItem>
                  <Footer
                    snippetCount={selectedSnippets.length}
                    onCreateGist={handleCreateGistClick(
                      selectedSnippets,
                      gistDescription,
                    )}
                    onGistDescriptionChange={handleGistDescriptionChange}
                  />
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
