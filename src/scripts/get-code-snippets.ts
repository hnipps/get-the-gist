import { getCodeSnippets } from "../utils/get-code-snippets-util";

let state = {
  findingSnippets: false,
  snippetsSaved: false
};

chrome.runtime.onMessage.addListener(msg => {
  if (msg.action == "find_snippets") {
    if (!state.findingSnippets) saveSnippets();
  }
});

const saveSnippets = () => {
  state = { ...state, findingSnippets: true };
  const codeSnippets = getCodeSnippets();
  const { href: url } = location;

  chrome.storage.local.set({ snippets: { [url]: { codeSnippets } } }, () => {
    state = {
      ...state,
      findingSnippets: false,
      snippetsSaved: true
    };
  });
};

saveSnippets();
