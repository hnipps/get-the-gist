import { h } from 'preact';
import Heading from '../heading/Heading';
import IconButton from '../icon-button/IconButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './dialog.css';
import '../../styles/typography.css';

const Dialog = ({ title, children, onDismiss, ...props }) => {
  return (
    // Not using `<dialog>` because there's an issue with the `open` prop
    <div className="dialog" {...props}>
      <header className="dialog__header">
        <Heading element="h4" className="h4 dialog__heading">
          {title}
        </Heading>
        <IconButton onClick={onDismiss} icon={faTimes} variant="tertiary" />
      </header>
      <section className="dialog__content">{children}</section>
    </div>
  );
};

export default Dialog;
