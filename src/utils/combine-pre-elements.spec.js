import { combinePreElements } from "./combine-pre-elements";

describe("combinePreElements", () => {
  const expectedText = ["this is some text", "here's some more text"];

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("when there is one pre element", () => {
    it("should combine the pre elements", () => {
      const preElement1 = document.createElement("pre");
      preElement1.innerText = expectedText[0];
      document
        .getElementsByTagName("body")
        .item(0)
        .appendChild(preElement1);

      const preElements = document.getElementsByTagName("pre");

      expect(combinePreElements(preElements)).toEqual({
        combined: [[preElement1]],
        temp: []
      });
    });
  });

  describe("when there are two pre elements", () => {
    it("should combine the pre elements", () => {
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

      const preElements = document.getElementsByTagName("pre");

      expect(combinePreElements(preElements)).toEqual({
        combined: [[preElement1, preElement2]],
        temp: []
      });
    });
  });
});
