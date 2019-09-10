import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import IconButton from '../icon-button/IconButton';

const ToggleButton = ({
  icon: { on: onIcon, off: offIcon },
  classes: { on: onClass, off: offClass },
  onClick,
  ...props
}) => {
  const [isOn, setIsOnState] = useState(false);
  const handleClick = useCallback(
    ev => {
      onClick(ev);
      setIsOnState(!isOn);
    },
    [isOn, setIsOnState],
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
