import { JSX } from "preact";

export interface ButtonProps extends JSX.HTMLAttributes {
  children: preact.ComponentChild | preact.ComponentChildren;
  className?: string;
  loading?: boolean;
}
