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

import "./header.css";

const Header = ({ onRefresh, loading }: HeaderProps) => {
  return (
    <header className="header">
      <Heading element="h1" className="h1">
        Your Snippets
      </Heading>
      <span class="header__icon-wrapper">
        <IconButton
          element="a"
          icon={faBullhorn}
          variant="tertiary"
          href="mailto:getthegistapp@gmail.com"
        />
        <IconButton
          className="header__icon-centre"
          icon={faSignOutAlt}
          variant="tertiary"
          onClick={() => null}
        />
        <IconButton
          icon={faSyncAlt}
          variant="primary"
          onClick={onRefresh}
          loading={loading}
          color="light"
        />
      </span>
    </header>
  );
};

export default Header;
