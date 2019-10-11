import { reduceAdjacentPreElements } from "./reduce-adjacent-pre-elements";

export const combinePreElements = preElements =>
  new Array(preElements.length)
    .fill(undefined)
    .map((_, i) => preElements.item(i))
    .reduce(reduceAdjacentPreElements, { combined: [], temp: [] });
