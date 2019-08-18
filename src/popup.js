const queryString = require('query-string');

const CLIENT_ID = '9faa326dfcbe2fd88a93';
const CLIENT_SECRET = 'acf05da3fc3662f78b741d0c07d5b718780ace86';
const REDIRECT_URI =
  'https://idgdjjeelpecmpjadkjemefojnncaefp.chromiumapp.org/';

const login = document.getElementById('login');

login.onclick = function(e) {
  e.preventDefault();
  chrome.identity.launchWebAuthFlow(
    {
      url: `https://github.com/login/oauth/authorize?scope=user:email:gist&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
      interactive: true,
    },
    url => {
      console.log(queryString);
      console.log(url);

      const {
        query: { code },
      } = queryString.parseUrl(url);
      console.log(code);

      const accessUrl = 'https://github.com/login/oauth/access_token';
      // The data we are going to send in our request
      let data = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      };
      // The parameters we are gonna pass to the fetch function
      let fetchData = {
        method: 'POST',
        body: data,
        headers: new Headers(),
      };
      fetch(accessUrl, fetchData).then(function(res) {
        // Handle response you get from the server
        console.log(res);
        const {
          query: { access_token: accessToken },
        } = queryString.parseUrl(res);
        console.log(accessToken);
      });
    },
  );
};
