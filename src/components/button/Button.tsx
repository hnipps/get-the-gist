import { h } from "preact";

import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import { ButtonProps } from "./button.props";

import "./button.css";

const Button = ({
  className,
  children,
  loading = false,
  ...props
}: ButtonProps) => (
  <button
    className={`button label ${loading ? "button--loading" : ""} ${className}`}
    {...props}
  >
    {children}
    {loading ? <LoadingSpinner className="button__loading-spinner" /> : null}
  </button>
);

export default Button;
