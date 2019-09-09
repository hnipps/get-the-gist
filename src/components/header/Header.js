import { h } from 'preact';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import IconButton from '../icon-button/IconButton';
import Heading from '../heading/Heading';

import './header.css';

const Header = () => {
  return (
    <header className="header">
      <Heading element="h1" className="h1">
        Your Snippets
      </Heading>
      <IconButton icon={faSyncAlt} />
    </header>
  );
};

export default Header;
