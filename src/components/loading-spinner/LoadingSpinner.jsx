import { h } from 'preact';

import './loading-spinner.css';

const LoadingSpinner = ({ className }) => {
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
