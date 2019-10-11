import { getCodeSnippets } from "./get-code-snippets-util";

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
        document
          .getElementsByTagName("body")
          .item(0)
          .appendChild(preElement1);

        expect(getCodeSnippets()).toEqual([{ code: expectedText[0] }]);
      });
    });

    describe("when the code snippet is composed of multiple pre elements", () => {
      it("should extract the text from pre elements", async () => {
        const expectedText = ["this is some text", "here's some more text"];
        const preElement1 = document.createElement("pre");
        preElement1.innerText = expectedText[0];
        document
          .getElementsByTagName("body")
          .item(0)
          .appendChild(preElement1);
        const preElement2 = document.createElement("pre");
        preElement2.innerText = expectedText[1];
        document
          .getElementsByTagName("body")
          .item(0)
          .appendChild(preElement2);
        const div = document.createElement("div");
        document
          .getElementsByTagName("body")
          .item(0)
          .appendChild(div);

        expect(getCodeSnippets()).toEqual([
          { code: expectedText[0] + "\\n\\n" + expectedText[1] }
        ]);
      });
    });
  });
});
