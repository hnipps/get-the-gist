import { getPreElements } from "./get-pre-elements";

describe("getPreElements", () => {
  it("should get all pre elements", () => {
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

    const result = getPreElements();
    expect(JSON.stringify(result)).toEqual(
      JSON.stringify({ 0: preElement1, 1: preElement2 })
    );
  });
});
