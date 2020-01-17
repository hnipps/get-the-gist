import { CLIENT_ID } from "./constants";
import { Subject } from "rxjs";
import { extractOAuthCode } from "./extract-oauth-code";
import { getRedirectUri } from "../chrome/constants";

const loginCode = new Subject<string>();
export const loginCode$ = loginCode.asObservable();

export const login = () =>
  chrome.identity.launchWebAuthFlow(
    {
      url: `https://github.com/login/oauth/authorize?scope=gist&client_id=${CLIENT_ID}&redirect_uri=${getRedirectUri()}`,
      interactive: true
    },
    url => {
      if (typeof url === "undefined") {
        loginCode.error(
          `Something went wrong when authorizing with GitHub... url: ${url}`
        );
        return;
      }
      const code = extractOAuthCode(url);
      loginCode.next(code);
    }
  );
