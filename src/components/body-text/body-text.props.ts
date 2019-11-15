import { JSX, ComponentChild, ComponentChildren } from "preact";

export interface BodyTextProps extends JSX.HTMLAttributes {
  children: ComponentChild | ComponentChildren;
  className: string;
}
