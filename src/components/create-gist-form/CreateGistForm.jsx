import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import TextField from '../text-field/TextField';

import './create-gist-form.css';

const CreateGistForm = ({ onCreateClick, code }) => {
  const [fileName, setFileName] = useState();
  const submitForm = useCallback(onCreateClick(fileName, code), [
    fileName,
    code,
  ]);
  const handleTextFieldChange = useCallback(
    ev => setFileName(ev.target.value),
    [setFileName],
  );
  return (
    <form className="create-gist-form" onSubmit={submitForm}>
      <TextField
        placeholder="Enter a file name..."
        value={fileName}
        onChange={handleTextFieldChange}
        className="create-gist-form__text-field"
      />
    </form>
  );
};

export default CreateGistForm;
