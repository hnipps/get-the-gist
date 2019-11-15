import { JSX } from "preact";

export interface HeadingProps extends JSX.HTMLAttributes {
  element: "h1" | "h2" | "h3" | "h4";
}
