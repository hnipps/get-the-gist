import { JSX } from "preact";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IconButtonProps extends Omit<JSX.HTMLAttributes, "icon"> {
  icon: IconProp;
  variant: "primary" | "secondary" | "tertiary";
  loading?: boolean;
}
