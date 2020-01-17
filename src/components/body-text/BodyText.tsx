import { h } from "preact";
import { combineClasses } from "../utils/combine-classes";
import { BodyTextProps } from "./body-text.props";

const BodyText = ({ children, className, ...props }: BodyTextProps) => {
  return (
    <p className={combineClasses("body-text", className)} {...props}>
      {children}
    </p>
  );
};

export default BodyText;
