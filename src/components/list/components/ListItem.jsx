import { h } from 'preact';

import './list-item.css';

const ListItem = ({ children, ...props }) => {
  return (
    <li className="list-item" {...props}>
      {children}
    </li>
  );
};

export default ListItem;
