import { Fragment, h } from 'preact';
import { useState, useCallback } from 'preact/hooks';

const Gist = ({ code, onCreateClick }) => {
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
    </>
  );
};

export default Gist;
