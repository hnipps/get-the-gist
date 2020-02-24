export const combineClasses = (...classNames: Array<string | undefined>) =>
  classNames.join(" ").trim();
