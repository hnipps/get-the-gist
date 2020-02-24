import { h } from "preact";

import TextField from "../text-field/TextField";
import Button from "../button/Button";
import { FooterProps } from "./footer.props";

import "./footer.css";

const Footer = ({
  onCreateGist,
  onGistDescriptionChange,
  snippetCount,
  loading
}: FooterProps) => {
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
        <Button type="submit" loading={loading}>
          Create Gist
        </Button>
      </form>
    </section>
  );
};

export default Footer;
