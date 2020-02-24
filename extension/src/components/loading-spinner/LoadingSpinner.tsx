import { h } from "preact";

import { LoadingSpinnerProps } from "./loading-spinner.props";

import "./loading-spinner.css";

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div class={`la-ball-spin la-sm ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
