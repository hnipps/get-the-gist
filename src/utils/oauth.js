const queryString = require("query-string");

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = chrome.identity.getRedirectURL();

export const login = () =>
  new Promise((resolve, error) =>
    chrome.identity.launchWebAuthFlow(
      {
        url: `https://github.com/login/oauth/authorize?scope=gist&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
        interactive: true
      },
      url => {
        const {
          query: { code }
        } = queryString.parseUrl(url);

        const baseUrl = "https://github.com/login/oauth/access_token";
        // The data we are going to send in our request
        const params = {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI
        };
        // The parameters we are gonna pass to the fetch function
        const fetchData = {
          method: "POST",
          headers: new Headers({ Accept: "application/json" })
        };
        const accessUrl = baseUrl + "?" + queryString.stringify(params);

        return fetch(accessUrl, fetchData)
          .then(function(res) {
            // Handle response you get from the server
            res
              .json()
              .then(({ access_token: accessToken }) => {
                chrome.storage.local.set({ accessToken }, () =>
                  chrome.storage.local.get(["accessToken"], () =>
                    resolve(accessToken)
                  )
                );
              })
              .catch(error);
          })
          .catch(err =>
            console.error(
              "Something went wrong when authorizing with GitHub...",
              err
            )
          );
      }
    )
  );
