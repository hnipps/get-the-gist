import { JSX } from "preact";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IconButtonProps
  extends Omit<JSX.HTMLAttributes, "icon" | "size"> {
  icon: IconProp;
  variant: "primary" | "secondary" | "tertiary";
  isLoading?: boolean;
  element?: "a" | "button";
  size?: "s" | "l";
  color?: "dark" | "light";
}
