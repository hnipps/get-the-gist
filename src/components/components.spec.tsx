import { h } from "preact";
import { mount } from "enzyme";

import * as components from ".";

describe("All components", () => {
  (Object.keys(components) as Array<keyof typeof components>).forEach(
    componentName => {
      describe(`${componentName}`, () => {
        it("should render without crashing", () => {
          const Component = components[componentName];
          // @ts-ignore
          const wrapper = mount(<Component />);
          expect(wrapper).toBeDefined();
        });
      });
    }
  );
});
