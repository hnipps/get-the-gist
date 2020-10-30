const queryString = require("query-string");

import { CLIENT_SECRET, CLIENT_ID } from "./constants";
import { Subject } from "rxjs";

const accessTokenSubject = new Subject();
export const accessToken$ = accessTokenSubject.asObservable();

export const requestAccessToken = (code: string, redirect_uri: string) => {
  const baseUrl = "http://127.0.0.1:5000/access-token";
  // The data we are going to send in our request
  const params = {
    code,
  };
  // The parameters we are gonna pass to the fetch function
  const fetchData = {
    method: "GET",
    headers: new Headers({ Accept: "application/json" })
  };
  const accessUrl = baseUrl + "?" + queryString.stringify(params);

  
  
  return fetch(accessUrl, fetchData)
  .then(res =>
    res
    .json()
    .then((res) => {
      console.log('resposnse', res);
      accessTokenSubject.next(res['access_token']);
        })
        .catch(
          err =>
            new Error(
              `Something went wrong when authorizing with GitHub... ${err}`
            )
        )
    )
    .catch(
      err =>
        new Error(`Something went wrong when authorizing with GitHub... ${err}`)
    );
};
