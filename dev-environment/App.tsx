import { h, render } from "preact";
import IconButton from "../src/components/icon-button/IconButton";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Dialog from "../src/components/dialog/Dialog";

const App = () => (
  <div>
    <Dialog title="Are you sure?" onDismiss={() => null}>
      Hello, World!
    </Dialog>
    <IconButton icon={faBullhorn} variant="tertiary" />
  </div>
);

render(<App />, document.body);
