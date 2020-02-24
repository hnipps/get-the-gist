import { h } from "preact";

import { ListItemProps } from "./list-item.props";

import "./list-item.css";

const ListItem = ({ children, ...props }: ListItemProps) => {
  return (
    <li className="list-item" {...props}>
      {children}
    </li>
  );
};

export default ListItem;
