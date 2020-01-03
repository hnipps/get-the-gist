import { combineClasses } from "./combine-classes";

describe("combineClasses", () => {
  it("should return a string of concatenated classnames", () => {
    expect(
      combineClasses("button", "large", "wide", "", " ", undefined)
    ).toEqual("button large wide");
  });
});
