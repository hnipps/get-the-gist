import { h } from "preact";
import { mount } from "enzyme";

import Accordion from "./Accordion";

describe("Accordion", () => {
  it("should render without crashing", () => {
    const wrapper = mount(<Accordion />);
    expect(wrapper).toBeDefined();
  });
});
