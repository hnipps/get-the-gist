import { reduceAdjacentPreElements } from "./reduce-adjacent-pre-elements";

describe("combineAdjacentPreElements", () => {
  const expectedText = ["this is some text", "here's some more text"];

  describe("when the first item has an adjacent pre element", () => {
    let preElement1;
    let preElement2;

    beforeEach(() => {
      preElement1 = document.createElement("pre");
      preElement1.innerText = expectedText[0];
      document
        .getElementsByTagName("body")
        .item(0)
        .appendChild(preElement1);
      preElement2 = document.createElement("pre");
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
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("should have 1 pre element in the temp arrya", () => {
      const mockAccumulator = { combined: [], temp: [] };
      const expectedResult = { combined: [], temp: [preElement1] };

      expect(reduceAdjacentPreElements(mockAccumulator, preElement1)).toEqual(
        expectedResult
      );
    });

    describe("when the second item does not have an adjacent pre element", () => {
      it("should have 2 pre elements in the combined array", () => {
        const mockAccumulator = { combined: [], temp: [preElement1] };
        const expectedResult = {
          combined: [[preElement1, preElement2]],
          temp: []
        };

        expect(reduceAdjacentPreElements(mockAccumulator, preElement2)).toEqual(
          expectedResult
        );
      });
    });
  });

  describe("when the first item does not have an adjacent pre element", () => {
    let preElement1;

    beforeEach(() => {
      preElement1 = document.createElement("pre");
      preElement1.innerText = expectedText[0];
      document
        .getElementsByTagName("body")
        .item(0)
        .appendChild(preElement1);
      const div = document.createElement("div");
      document
        .getElementsByTagName("body")
        .item(0)
        .appendChild(div);
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("should have only 1 pre element in the combined array", () => {
      const mockAccumulator = { combined: [], temp: [] };
      const expectedResult = { combined: [[preElement1]], temp: [] };

      expect(reduceAdjacentPreElements(mockAccumulator, preElement1)).toEqual(
        expectedResult
      );
    });
  });

  describe("when the first item is the last child element", () => {
    let preElement1;

    beforeEach(() => {
      preElement1 = document.createElement("pre");
      preElement1.innerText = expectedText[0];
      document
        .getElementsByTagName("body")
        .item(0)
        .appendChild(preElement1);
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    it("should have only 1 pre element in the combined array", () => {
      const mockAccumulator = { combined: [], temp: [] };
      const expectedResult = { combined: [[preElement1]], temp: [] };

      expect(reduceAdjacentPreElements(mockAccumulator, preElement1)).toEqual(
        expectedResult
      );
    });
  });
});
