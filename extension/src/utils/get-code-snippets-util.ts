import uuidv1 from "uuid/v1";

import { getPreElements } from "./get-pre-elements";
import { reduceInnerText } from "./reduce-inner-text";
import { combineElements } from "./combine-pre-elements";
import { CodeSnippet } from "../types/code-snippet.type";

export const getCodeSnippets = () => {
  const myArray = combineElements(getPreElements(), "pre");

  return myArray.combined.map<CodeSnippet>((combined, i) => ({
    code: combined.reduce(reduceInnerText, ""),
    id: uuidv1(),
    order: i
  }));
};
