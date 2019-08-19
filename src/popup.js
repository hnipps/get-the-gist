import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const queryString = require('query-string');

const CLIENT_ID = '9faa326dfcbe2fd88a93';
const CLIENT_SECRET = 'acf05da3fc3662f78b741d0c07d5b718780ace86';
const REDIRECT_URI =
  'https://idgdjjeelpecmpjadkjemefojnncaefp.chromiumapp.org/';

let token;

// chrome.storage.local.set({ test: 'test' });
// chrome.storage.local.get(['test'], res => console.log('RES', res));

const login = e => {
  e.preventDefault();
  chrome.identity.launchWebAuthFlow(
    {
      url: `https://github.com/login/oauth/authorize?scope=user%20email%20gist&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
      interactive: true,
    },
    url => {
      console.log(queryString);
      console.log(url);

      const {
        query: { code },
      } = queryString.parseUrl(url);
      console.log(code);

      const baseUrl = 'https://github.com/login/oauth/access_token';
      // The data we are going to send in our request
      const params = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      };
      // The parameters we are gonna pass to the fetch function
      const fetchData = {
        method: 'POST',
        headers: new Headers({ Accept: 'application/json' }),
      };
      const accessUrl = baseUrl + '?' + queryString.stringify(params);

      fetch(accessUrl, fetchData).then(function(res) {
        // Handle response you get from the server
        console.log(res);
        res.json().then(({ access_token: accessToken }) =>
          // saveData({ accessToken }, () => {
          //   loadData('accessToken', data => console.log(data));
          //   console.log('Access token saved!');
          // }),

          // chrome.storage.local.set({ test: 'test' }, () =>
          //   chrome.storage.local.get(['test'], res => console.log('RES', res)),
          // ),
          {
            console.log('AT', accessToken);

            chrome.storage.local.set({ accessToken }, () =>
              chrome.storage.local.get(['accessToken'], res =>
                console.log('AT RES', res),
              ),
            );
          },
        );
      });
    },
  );
};

const saveData = (data, callback) => chrome.storage.local.set(data, callback);

const loadData = (key, callback) => chrome.storage.local.get([key], callback);

const signOut = () => chrome.storage.local.remove('accessToken');

const App = () => {
  const [accessToken, setAccessToken] = useState(undefined);
  useEffect(() => {
    loadData('accessToken', ({ accessToken }) => setAccessToken(accessToken));
    chrome.storage.onChanged.addListener(({ accessToken: { newValue } }) =>
      setAccessToken(newValue),
    );
    chrome.storage.onChanged.addListener(changed =>
      console.log('CHANGE!', changed),
    );
  }, [setAccessToken, loadData]);

  return accessToken ? (
    <div>
      <h1>Logged in!</h1>
      <button onClick={signOut}>Sign out</button>
      <p>{accessToken}</p>
    </div>
  ) : (
    <button onClick={login}>Sign in to GitHub</button>
  );
  // );
};

// Inject our app into the DOM
render(<App />, document.body);
