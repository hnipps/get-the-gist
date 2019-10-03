const queryString = require("query-string");

import { CLIENT_SECRET, CLIENT_ID, REDIRECT_URI } from "./constants";
import { Subject } from "rxjs";

const accessTokenSubject = new Subject();
export const accessToken$ = accessTokenSubject.asObservable();

export const requestAccessToken = code => {
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
    .then(res =>
      res
        .json()
        .then(({ access_token: accessToken }) => {
          accessTokenSubject.next(accessToken);
        })
        .catch(err =>
          console.error(
            "Something went wrong when authorizing with GitHub...",
            err
          )
        )
    )
    .catch(err =>
      console.error("Something went wrong when authorizing with GitHub...", err)
    );
};
