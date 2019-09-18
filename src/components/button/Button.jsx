import { h } from 'preact';

import LoadingSpinner from '../loading-spinner/LoadingSpinner';

import './button.css';

const Button = ({ className, loading, children, ...props }) => (
  <button
    className={`button label ${loading ? 'button--loading' : ''} ${className}`}
    {...props}
  >
    {children}
    {loading ? <LoadingSpinner className="button__loading-spinner" /> : null}
  </button>
);

export default Button;
