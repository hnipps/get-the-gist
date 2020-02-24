import { JSX } from "preact";

export interface CopyToClipboardProps extends JSX.HTMLAttributes<HTMLInputElement> {
  value: string;
}
