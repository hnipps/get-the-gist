import { CLIENT_ID } from "./constants";
import { Subject } from "rxjs";
import { extractOAuthCode } from "./extract-oauth-code";
import { getRedirectUri } from "../chrome/constants";

const loginCode = new Subject();
export const loginCode$ = loginCode.asObservable();

export const login = () =>
  chrome.identity.launchWebAuthFlow(
    {
      url: `https://github.com/login/oauth/authorize?scope=gist&client_id=${CLIENT_ID}&redirect_uri=${getRedirectUri()}`,
      interactive: true
    },
    url => {
      const code = extractOAuthCode(url);
      loginCode.next(code);
    }
  );
