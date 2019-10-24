import { h } from "preact";

import "./overlay.css";

const Overlay = ({ children }) => {
  return <div className="overlay">{children}</div>;
};

export default Overlay;
