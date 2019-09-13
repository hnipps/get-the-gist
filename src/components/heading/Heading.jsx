import { h } from 'preact';

import "../../styles/typography.css";

const Heading = ({ element: Element, ...props }) => <Element {...props} />;

export default Heading;
