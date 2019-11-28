import { JSX } from "preact";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IconButtonProps
  extends Omit<JSX.HTMLAttributes, "icon" | "size"> {
  icon: IconProp;
  variant: "primary" | "secondary" | "tertiary";
  loading?: boolean;
  size?: "s" | "l";
  color?: "dark" | "light";
}
