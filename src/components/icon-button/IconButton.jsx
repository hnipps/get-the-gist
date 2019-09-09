import { h } from 'preact';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome';

import './icon-button.css';

const IconButton = ({ icon, ...props }) => {
  return (
    <button className="icon-button" {...props}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default IconButton;
