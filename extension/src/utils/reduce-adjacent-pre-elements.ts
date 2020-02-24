export const reduceAdjacentElements = (siblingTag: string) => <
  T extends Element
>(
  { combined, temp }: { combined: T[][]; temp: T[] },
  item: T
) =>
  item.nextElementSibling &&
  item.nextElementSibling.tagName.toLowerCase() === siblingTag
    ? { combined: [...combined], temp: [...temp, item] }
    : { combined: [...combined, [...temp, item]], temp: [] };
