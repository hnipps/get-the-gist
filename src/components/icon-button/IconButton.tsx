import { h } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";

import { combineClasses } from "../utils/combine-classes";
import { IconButtonProps } from "./icon-button.props";

import "./icon-button.css";

const IconButton = ({
  icon,
  variant,
  loading = false,
  className,
  ...props
}: IconButtonProps) => {
  const variantClass = variant ? `icon-button--${variant}` : "";
  const loadingClass = loading ? "icon-button--loading" : "";
  return (
    <button
      className={combineClasses(
        "icon-button",
        variantClass,
        loadingClass,
        className
      )}
      disabled={loading}
      {...props}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default IconButton;
