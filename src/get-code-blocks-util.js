(() => {
  const myArray = new Array(document.getElementsByTagName('pre').length)
    .fill(undefined)
    .map((_, i) => document.getElementsByTagName('pre').item(i))
    .reduce(
      ({ combined, temp }, item) =>
        item.nextElementSibling.tagName.toLowerCase() === 'pre'
          ? { combined: [...combined], temp: [...temp, item] }
          : { combined: [...combined, [...temp, item]], temp: [] },
      { combined: [], temp: [] },
    );

  return myArray.combined.map(combined =>
    combined.reduce(
      (acc, el) =>
        acc !== '' ? acc + '\\n\\n' + el.innerText : acc + el.innerText,
      '',
    ),
  );
})();
