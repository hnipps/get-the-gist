export const reduceAdjacentPreElements = ({ combined, temp }, item) =>
  item.nextElementSibling &&
  item.nextElementSibling.tagName.toLowerCase() === "pre"
    ? { combined: [...combined], temp: [...temp, item] }
    : { combined: [...combined, [...temp, item]], temp: [] };
