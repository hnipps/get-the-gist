import { h } from 'preact';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome';

import './icon-button.css';

const IconButton = ({ icon, variant, loading, ...props }) => {
  return (
    <button
      className={`icon-button ${variant ? `icon-button--${variant}` : ''} ${
        loading ? 'icon-button--loading' : ''
      }`}
      disabled={loading}
      {...props}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default IconButton;
