export const reduceInnerText = (acc: string, el: HTMLElement) =>
  acc !== "" ? acc + "\n\n" + el.innerText : acc + el.innerText;
