import { h } from "preact";
import { combineClasses } from "../utils/combine-classes";

const BodyText = ({ children, className, ...props }) => {
  return (
    <p className={combineClasses("body-text", className)} {...props}>
      {children}
    </p>
  );
};

export default BodyText;
