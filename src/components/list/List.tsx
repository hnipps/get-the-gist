import { h } from "preact";

import { ListProps } from "./list.props";

import "./list.css";

const List = ({ children, ...props }: ListProps) => {
  return (
    <ul className="list" {...props}>
      {children}
    </ul>
  );
};

export default List;
