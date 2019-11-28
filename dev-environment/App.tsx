import { h, render } from "preact";
import IconButton from "../src/components/icon-button/IconButton";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const App = () => (
  <div>
    <IconButton icon={faBullhorn} variant="tertiary" />
  </div>
);

render(<App />, document.body);
