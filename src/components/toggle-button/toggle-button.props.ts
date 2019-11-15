import { JSX } from "preact";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconButtonProps } from "../icon-button/icon-button.props";

type ToggleOptions<T> = {
  on: T;
  off: T;
};

export interface ToggleButtonProps
  extends Omit<JSX.HTMLAttributes, "icon" | "onClick"> {
  icon: ToggleOptions<IconProp>;
  classes: ToggleOptions<string>;
  onClick: ToggleOptions<(event: MouseEvent) => void>;
  variant: IconButtonProps["variant"];
}
