import { JSX } from "preact";

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  children: preact.ComponentChild | preact.ComponentChildren;
  className?: string;
  loading?: boolean;
}
