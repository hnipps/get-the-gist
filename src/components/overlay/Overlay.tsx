import { h } from "preact";

import { OverlayProps } from "./overlay.props";

import "./overlay.css";

const Overlay = ({ children }: OverlayProps) => {
  return <div className="overlay">{children}</div>;
};

export default Overlay;
