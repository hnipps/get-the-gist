require("dotenv").config();

import { login, loginCode$ } from "./utils";
import { requestAccessToken, accessToken$ } from "./utils/request-access-token";
import { take } from "rxjs/operators";

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "medium.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if (msg.action == "login") {
      loginCode$.pipe(take(1)).subscribe(code => requestAccessToken(code));
      accessToken$.pipe(take(1)).subscribe(accessToken => {
        chrome.storage.local.set({ accessToken });
        port.postMessage({ accessToken });
      });
      login();
    }
  });
});
