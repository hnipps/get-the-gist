import { CodeSnippet } from "./code-snippet.type";

export interface SnippetList {
  snippets: {
    [key: string]: {
      codeSnippets: CodeSnippet[];
    };
  };
}
