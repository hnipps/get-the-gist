import { JSX } from "preact";

export interface DialogProps extends JSX.HTMLAttributes {
  title: string;
  children: preact.ComponentChild | preact.ComponentChildren;
  onDismiss: (event: MouseEvent) => void;
}
