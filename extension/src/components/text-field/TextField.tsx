import { h } from "preact";

import { TextFieldProps } from "./text-field.props";
import { combineClasses } from "../utils/combine-classes";

import "./text-field.css";

const TextField = ({ className, ...props }: TextFieldProps) => {
  return (
    <input className={combineClasses("text-field", className)} {...props} />
  );
};

export default TextField;
