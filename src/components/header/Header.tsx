import { h } from "preact";
import {
  faSyncAlt,
  faBullhorn,
  faSign,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import IconButton from "../icon-button/IconButton";
import Heading from "../heading/Heading";
import { HeaderProps } from "./header.props";
import { sendEmail } from "../../utils/send-email";

import "./header.css";

const Header = ({ onRefresh, isLoading }: HeaderProps) => {
  const handleFeedbackButtonClick = () => {
    console.log("Feedback!");

    sendEmail("getthegistapp@gmail.com");
  };
  return (
    <header className="header">
      <Heading element="h1" className="h1">
        Your Snippets
      </Heading>
      <span class="header__icon-wrapper">
        <IconButton
          title="Give feedback"
          className="header__icon-centre"
          element="button"
          icon={faBullhorn}
          variant="tertiary"
          onClick={handleFeedbackButtonClick}
        />
        <IconButton
          title="Refresh snippets"
          icon={faSyncAlt}
          variant="primary"
          onClick={onRefresh}
          isLoading={isLoading}
          color="light"
        />
      </span>
    </header>
  );
};

export default Header;
