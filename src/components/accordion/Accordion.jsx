import { h, Fragment } from 'preact';
import { FontAwesomeIcon } from '@aduh95/preact-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './accordion.css';

const Accordion = ({ children, header }) => {
  return (
    <>
      <dt className="accordion__header">
        <span className="accordion__icon-wrapper">
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        {header}
      </dt>
      <dd className="accordion__content">{children}</dd>
    </>
  );
};

export default Accordion;
