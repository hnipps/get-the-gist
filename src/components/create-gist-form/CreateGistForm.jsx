import { h, Fragment } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import TextField from '../text-field/TextField';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import ToggleButton from '../toggle-button/ToggleButton';

import './create-gist-form.css';

const CreateGistForm = ({ code, onAddSnippetClick, onRemoveSnippetClick }) => {
  const [fileName, setFileName] = useState();
  const submitForm = useCallback(onCreateClick(fileName, code), [
    fileName,
    code,
  ]);
  const handleTextFieldChange = useCallback(
    ev => setFileName(ev.target.value),
    [setFileName],
  );
  const preventAccordionDefault = ev => {
    ev.stopPropagation();
    ev.preventDefault();
  };
  return (
    <span className="create-gist-form__wrapper">
      <form className="create-gist-form" onSubmit={submitForm}>
        <TextField
          placeholder="Enter a file name..."
          value={fileName}
          onChange={handleTextFieldChange}
          onClick={preventAccordionDefault}
          className="create-gist-form__text-field"
        />
      </form>
      <ToggleButton
        icon={{ off: faPlus, on: faCheck }}
        variant="secondary"
        onClick={{
          on: ev => {
            preventAccordionDefault(ev);
            onRemoveSnippetClick(ev);
          },
          off: ev => {
            preventAccordionDefault(ev);
            onAddSnippetClick(ev);
          },
        }}
        classes={{
          on: 'create-gist-form__button--on',
          off: 'create-gist-form__button--off',
        }}
      />
    </span>
  );
};

export default CreateGistForm;
