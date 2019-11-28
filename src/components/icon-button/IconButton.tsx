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
  size,
  color = "dark",
  ...props
}: IconButtonProps) => {
  const variantClass = variant ? `icon-button--${variant}` : "";
  const loadingClass = loading ? "icon-button--loading" : "";
  const sizeClass = size === "s" ? "icon-button--small" : "";
  const colorClass = `icon-button--${color}`;
  return (
    <button
      className={combineClasses(
        "icon-button",
        variantClass,
        loadingClass,
        sizeClass,
        colorClass,
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
