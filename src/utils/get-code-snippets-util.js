import uuidv1 from "uuid/v1";

import { getPreElements } from "./get-pre-elements";
import { reduceInnerText } from "./reduce-inner-text";
import { combinePreElements } from "./combine-pre-elements";

export const getCodeSnippets = () => {
  const myArray = combinePreElements(getPreElements());

  return myArray.combined.map((combined, i) => ({
    code: combined.reduce(reduceInnerText, ""),
    id: uuidv1(),
    order: i
  }));
};
