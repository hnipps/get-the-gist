import { getCodeSnippets } from "../utils/get-code-snippets-util";

let state = {
  findingSnippets: false,
  snippetsSaved: false
};

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.action == "find_snippets") {
    saveSnippets();
    sendResponse();
  }
});

const saveSnippets = () => {
  state = { ...state, findingSnippets: true };
  const codeSnippets = getCodeSnippets();
  chrome.storage.local.set({ codeSnippets }, () => {
    state = { ...state, findingSnippets: false, snippetsSaved: true };
  });
};
saveSnippets();
