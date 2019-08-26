import { Fragment, h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

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
          <button onClick={() => document.execCommand('copy', false, url)}>
            <FontAwesomeIcon
              style={{
                marginLeft: '0.5rem',
                background: 'lightgray',
                borderRadius: '50%',
                width: '1rem',
                height: '1rem',
                padding: '0.25rem',
                verticalAlign: 'middle',
              }}
              icon={faCopy}
            />
          </button>
        </p>
      )}
    </>
  );
};

export default Gist;
