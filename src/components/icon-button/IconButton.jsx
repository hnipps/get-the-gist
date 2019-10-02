import { h } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";

import "./icon-button.css";
import { combineClasses } from "../utils/combine-classes";

const IconButton = ({ icon, variant, loading, className, ...props }) => {
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
