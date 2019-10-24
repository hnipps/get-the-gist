export const reduceInnerText = (acc, el) =>
  acc !== "" ? acc + "\\n\\n" + el.innerText : acc + el.innerText;
