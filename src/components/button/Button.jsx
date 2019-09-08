import { h } from 'preact';

import './button.css';

const Button = ({ className, ...props }) => (
  <button className={`button label ${className}`} {...props} />
);

export default Button;
