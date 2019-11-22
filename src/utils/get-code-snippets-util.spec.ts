// eslint-disable-next-line no-unused-vars
import uuidv1 from "uuid/v1";

import { getCodeSnippets } from "./get-code-snippets-util";

const MOCK_ID = "unique-id";

jest.mock("uuid/v1", () => {
  return jest.fn().mockImplementation(() => {
    return MOCK_ID;
  });
});

describe("getCodeBlocks", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("when there is one code snippet", () => {
    describe("when the code snippet is composed of one pre element", () => {
      it("should extract the text from pre element", async () => {
        const expectedText = ["this is some text", "here's some more text"];
        const preElement1 = document.createElement("pre");
        preElement1.innerText = expectedText[0];
        const bodyEl = document.getElementsByTagName("body").item(0);

        if (bodyEl !== null) {
          bodyEl.appendChild(preElement1);
        }

        expect(getCodeSnippets()).toEqual([
          { code: expectedText[0], order: 0, id: MOCK_ID }
        ]);
      });
    });

    describe("when the code snippet is composed of multiple pre elements", () => {
      it("should extract the text from pre elements", async () => {
        const expectedText = ["this is some text", "here's some more text"];
        const preElement1 = document.createElement("pre");
        preElement1.innerText = expectedText[0];
        const bodyEl = document.getElementsByTagName("body").item(0);

        if (bodyEl !== null) {
          bodyEl.appendChild(preElement1);
        }

        const preElement2 = document.createElement("pre");
        preElement2.innerText = expectedText[1];

        if (bodyEl !== null) {
          bodyEl.appendChild(preElement2);
        }

        const div = document.createElement("div");

        if (bodyEl !== null) {
          bodyEl.appendChild(div);
        }

        expect(getCodeSnippets()).toEqual([
          {
            code: expectedText[0] + "\n\n" + expectedText[1],
            order: 0,
            id: MOCK_ID
          }
        ]);
      });
    });
  });
});
