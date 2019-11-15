import { h, Fragment, JSX, ComponentType } from "preact";
import { useState, useCallback } from "preact/hooks";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import {
  faChevronRight,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { AccordionProps } from "./accordion.props";

import "./accordion.css";

const Accordion = ({ children, header }: AccordionProps) => {
  const [isOpen, setIsOpenState] = useState(false);
  const handleHeaderClick = useCallback(() => setIsOpenState(!isOpen), [
    isOpen,
    setIsOpenState
  ]);
  const accordionIcon = isOpen ? faChevronDown : faChevronRight;

  return (
    <Fragment>
      <dt>
        <button className="accordion__button" onClick={handleHeaderClick}>
          <span className="accordion__icon-wrapper">
            <FontAwesomeIcon icon={accordionIcon} />
          </span>
          {header}
        </button>
      </dt>
      {isOpen && <dd className="accordion__content">{children}</dd>}
    </Fragment>
  );
};

export default Accordion;
