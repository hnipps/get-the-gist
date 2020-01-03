import { reduceAdjacentElements } from "./reduce-adjacent-pre-elements";
import { isNotNull } from "./is-not-null";

export const combineElements = <T extends Element>(
  elements: HTMLCollectionOf<T>,
  tagName: string
) =>
  new Array(elements.length)
    .fill(undefined)
    .map((_, i) => elements.item(i))
    .filter(isNotNull)
    .reduce<{ combined: T[][]; temp: T[] }>(reduceAdjacentElements(tagName), {
      combined: [],
      temp: []
    });
