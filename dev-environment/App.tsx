import { h, render } from "preact";
import IconButton from "../src/components/icon-button/IconButton";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Dialog from "../src/components/dialog/Dialog";
import Main from "../src/pages/main/Main";
import Button from "../src/components/button/Button";

const App = () => (
  <div>
    <Dialog title="Are you sure?" onDismiss={() => null}>
      Hello, World!
    </Dialog>
    <IconButton icon={faBullhorn} variant="tertiary" />
    <Main currentTab="" createGist={() => null as any} />
    <Dialog title="Are you sure?" onDismiss={() => null}>
      <Button variant="secondary">Cancel</Button>
      <Button>Sign out</Button>
    </Dialog>
  </div>
);

render(<App />, document.body);
