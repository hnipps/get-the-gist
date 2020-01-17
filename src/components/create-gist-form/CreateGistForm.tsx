import { h } from "preact";
import TextField from "../text-field/TextField";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

import ToggleButton from "../toggle-button/ToggleButton";
import { GistItemFormProps } from "./create-gist-form.props";

import "./create-gist-form.css";

const GistItemForm = ({
  onAddSnippetClick,
  onRemoveSnippetClick,
  onFilenameChange,
  filename
}: GistItemFormProps) => {
  const preventAccordionDefault = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };
  return (
    <span className="create-gist-form__wrapper">
      <TextField
        placeholder="Enter a file name..."
        value={filename}
        onChange={onFilenameChange}
        onClick={preventAccordionDefault}
        className="create-gist-form__text-field"
      />
      <ToggleButton
        icon={{ off: faPlus, on: faCheck }}
        variant="secondary"
        onClick={{
          on: event => {
            preventAccordionDefault(event);
            onRemoveSnippetClick(event);
          },
          off: ev => {
            preventAccordionDefault(ev);
            onAddSnippetClick(ev);
          }
        }}
        classes={{
          on: "create-gist-form__button--on",
          off: "create-gist-form__button--off"
        }}
      />
    </span>
  );
};

export default GistItemForm;
