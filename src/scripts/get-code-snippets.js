import { getCodeSnippets } from "../utils/get-code-snippets-util";

let state = {
  findingSnippets: false,
  snippetsSaved: false,
  currentTab: ""
};

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.action == "find_snippets") {
    const { findingSnippets, snippetsSaved } = state;

    if (!findingSnippets) saveSnippets();
    sendResponse(snippetsSaved);
  }
});

const saveSnippets = () =>
  new Promise(res => {
    state = { ...state, findingSnippets: true };
    const codeSnippets = getCodeSnippets();
    const url = location.href;

    chrome.storage.local.set({ snippets: { [url]: { codeSnippets } } }, () => {
      state = {
        ...state,
        findingSnippets: false,
        snippetsSaved: true
      };
      res();
    });
  });

saveSnippets();
