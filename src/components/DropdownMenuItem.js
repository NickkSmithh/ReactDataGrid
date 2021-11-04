import React from "react";

const DropdownItem = () => {
  return (
    <li onClick={onItemClick}>
      <a href="#">{item}</a>
    </li>
  );
};

export default DropdownItem;
