require('dotenv').config();

import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { login } from './oauth';
import { getCodeBlocks } from './get-code-blocks';
import { setupCreateGist } from './create-gist';
import Gist from './components/Gist';
import List from './components/list/List';
import ListItem from './components/list/components/ListItem';

import './popup.css';

const Octokit = require('@octokit/rest');

const loadData = (key, callback) => chrome.storage.local.get([key], callback);

const signOut = setAccessToken => () =>
  chrome.storage.local.remove('accessToken', () => setAccessToken(undefined));

const App = () => {
  const [accessToken, setAccessToken] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [codeBlocks, setCodeBlocks] = useState();
  const [error, setError] = useState();
  loadData('accessToken', ({ accessToken }) => setAccessToken(accessToken));

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
    setLoading(true);
    login()
      .then(token => {
        setAccessToken(token);
        setLoading(false);
      })
      .catch(error => console.error(error));
  };

  console.log({ accessToken });

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="wrapper">
        {accessToken ? (
          <div>
            <h1>Logged in!</h1>
            <div>
              <button onClick={signOut(setAccessToken)}>Sign out</button>
              <button onClick={() => getCodeBlocks(setCodeBlocks, setError)}>
                Get code blocks
              </button>
            </div>
            {error && <p>{error}</p>}
            {codeBlocks ? (
              <List>
                {codeBlocks.map(block => (
                  <ListItem>
                    <Gist
                      code={block}
                      onCreateClick={(fileName, code) => event => {
                        event.preventDefault();
                        setupCreateGist(octokit)({
                          [fileName]: { content: code },
                        });
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : null}
          </div>
        ) : (
          <button onClick={handleLogin}>Sign in to GitHub</button>
        )}
      </div>
    );
  }
};

// Inject our app into the DOM
render(<App />, document.body);
