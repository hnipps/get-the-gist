import uuidv1 from 'uuid/v1';

export const getCodeBlocks = (setCodeBlocks, setError) =>
  new Promise((resolve, err) => {
    setError(undefined);
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: `(() => {
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
        
          return myArray.combined.map(combined => ({
            code: combined.reduce(
              (acc, el) =>
                acc !== '' ? acc + '\\n\\n' + el.innerText : acc + el.innerText,
              '',
            ),
          }));
        })();
        `,
        },
        res => {
          res[0].length > 0
            ? (() => {
                resolve();
                setCodeBlocks(
                  res[0].map((codeBlock, i) => ({
                    ...codeBlock,
                    id: uuidv1(),
                    order: i,
                  })),
                );
              })()
            : (() => {
                setError('No code blocks found!');
                err('No code blocks found!');
              })();
        },
      );
    });
  });
