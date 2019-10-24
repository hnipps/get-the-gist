import { h, Fragment } from "preact";
import { useState, useCallback } from "preact/hooks";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import {
  faChevronRight,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

import "./accordion.css";

const Accordion = ({ children, header }) => {
  const [isOpen, setIsOpenState] = useState(false);
  const handleHeaderClick = useCallback(() => setIsOpenState(!isOpen), [
    isOpen,
    setIsOpenState
  ]);
  const accordionIcon = isOpen ? faChevronDown : faChevronRight;

  return (
    <>
      <dt>
        <button className="accordion__button" onClick={handleHeaderClick}>
          <span className="accordion__icon-wrapper">
            <FontAwesomeIcon icon={accordionIcon} />
          </span>
          {header}
        </button>
      </dt>
      {isOpen && <dd className="accordion__content">{children}</dd>}
    </>
  );
};

export default Accordion;
