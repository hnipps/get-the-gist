import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import './copy-to-clipboard.css';

const CopyToClipboard = ({ value, ...props }) => {
  const handleCopyClick = useCallback(() => copy(value), [value]);
  return (
    <div className="copy-to-clipboard">
      <input
        className="copy-to-clipboard__input"
        value={value}
        disabled={true}
        {...props}
      />
      <button className="copy-to-clipboard__button" onClick={handleCopyClick}>
        <FontAwesomeIcon icon={faCopy} />
      </button>
    </div>
  );
};

export default CopyToClipboard;
