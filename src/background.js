import { login } from './utils';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'medium.com' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == 'login');
  port.onMessage.addListener(function(msg) {
    console.log(msg);
    if (msg.action == 'login') {
      login()
        .then(token => {
          console.log('Setting token...', token);
          port.postMessage({ token });
        })
        .catch(error => console.error(error));
    }
  });
});
