import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import { getCodeBlocks, setupCreateGist } from './utils';
import Gist from './components/gist/Gist';
import List from './components/list/List';
import ListItem from './components/list/components/ListItem';

import './popup.css';
import Login from './components/login/Login';
import Header from './components/header/Header';

const Octokit = require('@octokit/rest');

const signOut = setAccessToken => () =>
  chrome.storage.local.remove('accessToken', () => setAccessToken(undefined));

const App = () => {
  const [accessToken, setAccessToken] = useState(undefined);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [codeBlocks, setCodeBlocks] = useState();
  const [error, setError] = useState();
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
    return (fileName, code) => event => {
      event.preventDefault();

      setupCreateGist(octokit)({
        [fileName]: { content: code },
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
    getCodeBlocks(setCodeBlocks, setError).then(() => {
      console.log('Stop refreshing!');

      setIsRefreshing(false);
    });
  };

  return (
    <main className="popup__wrapper">
      {accessToken ? (
        <div className="popup__main-content-wrapper">
          <Header onRefresh={handleRefresh} loading={isRefreshing} />
          <div>
            <button onClick={signOut(setAccessToken)}>Sign out</button>
          </div>
          {error && <p>{error}</p>}
          {codeBlocks ? (
            <List>
              {codeBlocks.map(codeBlock => (
                <ListItem>
                  <Gist
                    code={codeBlock.code}
                    url={codeBlock.url}
                    onCreateClick={handleCreateGistClick(codeBlock)}
                  />
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>
      ) : (
        <Login onLogin={handleLogin} loading={isLoggingIn} />
      )}
    </main>
  );
};

// Inject our app into the DOM
render(<App />, document.body);
