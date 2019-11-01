import { reduceInnerText } from "./reduce-inner-text";

describe("reduceInnerText", () => {
  const expectedText = ["this is some text", "here's some more text"];
  let preElement1;
  let preElement2;

  beforeEach(() => {
    preElement1 = document.createElement("pre");
    preElement1.innerText = expectedText[0];
    preElement2 = document.createElement("pre");
    preElement2.innerText = expectedText[1];
  });

  it("should return the inner text of the element", () => {
    expect(reduceInnerText("", preElement1)).toEqual(expectedText[0]);
  });

  it("should concatenate the inner text of the elements", () => {
    expect(reduceInnerText(expectedText[0], preElement2)).toEqual(
      expectedText[0] + "\n\n" + expectedText[1]
    );
  });
});
