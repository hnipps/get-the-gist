import { h } from 'preact';

import './list.css';

const List = ({ children, ...props }) => {
  return (
    <ul className="list" {...props}>
      {children}
    </ul>
  );
};

export default List;
