import { h } from 'preact';

import './footer.css';
import TextField from '../text-field/TextField';
import Button from '../button/Button';

const Footer = ({
  onCreateGist,
  onGistDescriptionChange,
  snippetCount,
  loading,
}) => {
  const snippetsString = snippetCount === 1 ? 'snippet' : 'snippets';
  return (
    <section className="footer">
      {snippetCount} {snippetsString} selected.
      <span>
        <TextField
          className="footer__text-field"
          placeholder="Gist description..."
          onChange={onGistDescriptionChange}
        />
        <Button variant="primary" onClick={onCreateGist} loading={loading}>
          Create Gist
        </Button>
      </span>
    </section>
  );
};

export default Footer;
