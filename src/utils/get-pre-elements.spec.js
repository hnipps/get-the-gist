import { getPreElements } from "./get-pre-elements";

describe("getPreElements", () => {
  it("should get all pre elements", () => {
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

    const result = getPreElements();
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify({ 0: preElement1, 1: preElement2 })
    );
  });
});
