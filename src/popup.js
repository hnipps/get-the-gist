import { h, render, Fragment } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { getCodeBlocks, setupCreateGist } from './utils';
import Gist from './components/gist/Gist';
import List from './components/list/List';
import ListItem from './components/list/components/ListItem';
import Login from './components/login/Login';
import Header from './components/header/Header';
import Accordion from './components/accordion/Accordion';
import GistItemForm from './components/create-gist-form/CreateGistForm';
import Footer from './components/footer/footer';

import './popup.css';
import Overlay from './components/overlay/Overlay';
import Dialog from './components/dialog/Dialog';
import CopyToClipboard from './components/copy-to-clipboard/CopyToClipboard';
import Heading from './components/heading/Heading';

const Octokit = require('@octokit/rest');

const signOut = setAccessToken => () =>
  chrome.storage.local.remove('accessToken', () => setAccessToken(undefined));

const App = () => {
  const [accessToken, setAccessToken] = useState(undefined);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [snippetList, setSnippetList] = useState();
  const [snippetListStatus, setSnippetListStatus] = useState(
    'No snippets found.',
  );
  const [selectedSnippets, setSelectedSnippets] = useState([]);
  const [gistDescription, setGistDescription] = useState();
  const [showOverlay, setShowOverlay] = useState(false);
  const [lastGistUrl, setLastGistUrl] = useState();
  const [isCreatingGist, setIsCreatingGist] = useState(false);
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
    console.log('Creating gist...');

    event.preventDefault();

    const files = snippets.reduce(
      (acc, { filename, code }, i) => ({
        ...acc,
        [filename || `file${i}`]: { content: code },
      }),
      {},
    );

    setIsCreatingGist(true);
    setupCreateGist(octokit)(files, description).then(
      ({ data: { html_url: url } }) => {
        setIsCreatingGist(false);
        setLastGistUrl(url);
        setShowOverlay(true);
      },
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSnippetListStatus('Looking for code snippets...');
    getCodeBlocks(setSnippetList)
      .then(() => {
        setIsRefreshing(false);
      })
      .catch(() => {
        setIsRefreshing(false);
        setSnippetListStatus('No snippets found.');
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
          <List>
            {snippetList ? (
              snippetList.map(codeBlock => (
                <ListItem>
                  <Accordion
                    header={
                      <GistItemForm
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
              ))
            ) : (
              <ListItem className="snippet-status__list-item">
                <Heading element="p" className="h4">
                  {snippetListStatus}
                </Heading>
              </ListItem>
            )}
          </List>
          {snippetList ? (
            <Footer
              snippetCount={selectedSnippets.length}
              onCreateGist={handleCreateGistClick(
                selectedSnippets,
                gistDescription,
              )}
              onGistDescriptionChange={handleGistDescriptionChange}
              loading={isCreatingGist}
            />
          ) : null}
        </div>
      ) : (
        <Login onLogin={handleLogin} loading={isLoggingIn} />
      )}
      {showOverlay ? (
        <Overlay>
          <Dialog title="Gist Created." onDismiss={() => setShowOverlay(false)}>
            <CopyToClipboard value={lastGistUrl} />
          </Dialog>
        </Overlay>
      ) : null}
    </main>
  );
};

// Inject our app into the DOM
render(<App />, document.body);
