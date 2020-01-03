import { JSX, ComponentChild, ComponentChildren } from "preact";

export interface BodyTextProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  children: ComponentChild | ComponentChildren;
  className: string;
}
