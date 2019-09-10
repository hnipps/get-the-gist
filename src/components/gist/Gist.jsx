import { Fragment, h } from 'preact';
import copy from 'copy-to-clipboard';

import { useState, useCallback } from 'preact/hooks';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import './gist.css';

const Gist = ({ code, url }) => {
  return (
    <>
      <pre className="gist__code">{code}</pre>
      {url && (
        <p>
          {url}
          <button
            title="Copy to clipboard."
            className="gist__copy-button"
            onClick={() => copy(url)}
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </p>
      )}
    </>
  );
};

export default Gist;
