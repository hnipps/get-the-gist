import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import IconButton from "../icon-button/IconButton";

const ToggleButton = ({
  icon: { on: onIcon, off: offIcon },
  classes: { on: onClass, off: offClass },
  onClick: { on: onOnClick, off: offOnClick },
  ...props
}) => {
  const [isOn, setIsOnState] = useState(false);
  const handleClick = useCallback(
    ev => {
      isOn ? onOnClick(ev) : offOnClick(ev);
      setIsOnState(!isOn);
    },
    [isOn, onOnClick, offOnClick, setIsOnState]
  );
  return (
    <IconButton
      icon={isOn ? onIcon : offIcon}
      className={isOn ? onClass : offClass}
      onClick={handleClick}
      {...props}
    />
  );
};

export default ToggleButton;
