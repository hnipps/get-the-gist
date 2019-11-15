import { h, Fragment } from "preact";
import { useState, useCallback } from "preact/hooks";

import IconButton from "../icon-button/IconButton";
import { ToggleButtonProps } from "./toggle-button.props";

const ToggleButton = ({
  icon: { on: onIcon, off: offIcon },
  classes: { on: onClass, off: offClass },
  onClick: { on: onOnClick, off: offOnClick },
  ...props
}: ToggleButtonProps) => {
  const [isOn, setIsOnState] = useState(false);
  const handleClick = useCallback(
    (ev: MouseEvent) => {
      isOn ? onOnClick(ev) : offOnClick(ev);
      setIsOnState(!isOn);
    },
    [isOn, onOnClick, offOnClick, setIsOnState]
  );
  return (
    <Fragment>
      {isOn ? (
        <IconButton
          icon={onIcon}
          className={isOn ? onClass : offClass}
          onClick={handleClick}
          {...props}
        />
      ) : (
        <IconButton
          icon={offIcon}
          className={isOn ? onClass : offClass}
          onClick={handleClick}
          {...props}
        />
      )}
    </Fragment>
  );
};

export default ToggleButton;
