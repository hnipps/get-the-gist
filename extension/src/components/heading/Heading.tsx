import { h } from "preact";

import { HeadingProps } from "./heading.props";

import "../../styles/typography.css";

const Heading = ({ element: Element, ...props }: HeadingProps) => (
  <Element {...props} />
);

export default Heading;
