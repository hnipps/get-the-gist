import { h } from "preact";

import "./footer.css";
import TextField from "../text-field/TextField";
import Button from "../button/Button";

const Footer = ({
  onCreateGist,
  onGistDescriptionChange,
  snippetCount,
  loading
}) => {
  const snippetsString = snippetCount === 1 ? "snippet" : "snippets";
  return (
    <section className="footer">
      {snippetCount} {snippetsString} selected.
      <form onSubmit={onCreateGist}>
        <TextField
          className="footer__text-field"
          placeholder="Gist description..."
          onChange={onGistDescriptionChange}
        />
        <Button type="submit" variant="primary" loading={loading}>
          Create Gist
        </Button>
      </form>
    </section>
  );
};

export default Footer;
