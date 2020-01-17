import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";

const Octokit = require("@octokit/rest");

import "./popup.css";

import Login from "./components/login/Login";
import Main from "./pages/main/Main";
import { setupCreateGist } from "./utils/setup-create-gist";
import Overlay from "./components/overlay/Overlay";
import Dialog from "./components/dialog/Dialog";
import Button from "./components/button/Button";

const App = () => {
  const [accessToken, setAccessToken] = useState(undefined);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const handleLogin = (e: MouseEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const port = chrome.runtime.connect({ name: "login" });
    port.postMessage({ action: "login" });
    port.onMessage.addListener(() => setIsLoggingIn(false));
  };

  const handleSignOut = (e: MouseEvent) => {
    e.preventDefault();
    setShowOverlay(true);
  };

  const confirmSignOut = () => {
    setShowOverlay(false);
    chrome.storage.local.remove("accessToken", () => setAccessToken(undefined));
  };

  // TODO: Can we use useEffect here? I suspect it's called many, many times right now
  chrome.storage.local.get("accessToken", ({ accessToken }) =>
    setAccessToken(accessToken)
  );

  let octokit;
  let createGist;
  if (accessToken) {
    octokit = Octokit({
      auth: accessToken,
      userAgent: "get-the-gist v1.0.0",
      log: console
    });
    createGist = setupCreateGist(octokit);
  }

  useEffect(
    () =>
      chrome.tabs.onUpdated.addListener((_, { url }) => {
        // Might need to update this to ignore any #paths or URL queries
        if (url !== currentTab && typeof url !== "undefined") {
          setCurrentTab(url);
        }
      }),
    [setCurrentTab]
  );

  useEffect(
    () =>
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const url = tabs[0].url;
        if (typeof url !== "undefined") {
          setCurrentTab(url);
        }
      }),
    [setCurrentTab]
  );

  return (
    <main className="popup__wrapper">
      {accessToken && createGist ? (
        <Main
          createGist={createGist}
          currentTab={currentTab}
          handleSignOut={handleSignOut}
        />
      ) : (
        <Login onLogin={handleLogin} loading={isLoggingIn} />
      )}
      {showOverlay ? (
        <Overlay>
          <Dialog title="Are you sure?" onDismiss={() => setShowOverlay(false)}>
            <Button
              className="confirm-dialog__button"
              variant="secondary"
              onClick={() => setShowOverlay(false)}
            >
              Cancel
            </Button>
            <Button className="confirm-dialog__button" onClick={confirmSignOut}>
              Sign out
            </Button>
          </Dialog>
        </Overlay>
      ) : null}
    </main>
  );
};

// Inject our app into the DOM
render(<App />, document.body);
