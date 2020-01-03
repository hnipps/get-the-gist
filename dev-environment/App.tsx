import { h, render } from "preact";
import IconButton from "../src/components/icon-button/IconButton";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Dialog from "../src/components/dialog/Dialog";
import Main from "../src/pages/main/Main";

const App = () => (
  <div>
    <Dialog title="Are you sure?" onDismiss={() => null}>
      Hello, World!
    </Dialog>
    <IconButton icon={faBullhorn} variant="tertiary" />
    <Main currentTab="" createGist={() => null as any} />
  </div>
);

render(<App />, document.body);
