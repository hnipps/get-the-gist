import { Fragment, h } from 'preact';
import copy from 'copy-to-clipboard';

import { useState, useCallback } from 'preact/hooks';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import './gist.css';

const Gist = ({ code, onCreateClick, url }) => {
  const [fileName, setFileName] = useState();
  const submitForm = useCallback(onCreateClick(fileName, code), [
    fileName,
    code,
  ]);
  return (
    <>
      <pre>{code}</pre>
      <form onSubmit={submitForm}>
        <input
          placeholder="Enter a file name..."
          value={fileName}
          onChange={ev => setFileName(ev.target.value)}
        />
        <input type="submit">Create Gist</input>
      </form>
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
