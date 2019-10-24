import uuidv1 from "uuid/v1";

export const getCodeBlocks = setCodeBlocks =>
  new Promise((resolve, err) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          file: "scripts/test.js"
        },
        res => {
          console.log(res);

          res[0].length > 0
            ? (() => {
                resolve();
                setCodeBlocks(
                  res[0].map((codeBlock, i) => ({
                    ...codeBlock,
                    id: uuidv1(),
                    order: i
                  }))
                );
              })()
            : (() => {
                err("No snippets found.");
              })();
        }
      );
    });
  });
