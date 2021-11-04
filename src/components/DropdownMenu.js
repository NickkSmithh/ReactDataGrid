import React, { useEffect, useState, useRef } from "react";

const DropdownMenu = ({ items, setCurtReportConfig, curtReportConfig }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropRef = useRef(null);

  // - Dropdown logic -
  const toggleDropDown = () => {
    setDropdown(!dropdown);
  };

  //Close dropdown then clicked out
  function handleClick(e) {
    if (!e.target.closest(`.${dropRef.current.className}`) && dropdown) {
      setDropdown(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const addColumn = (index) => {
    const chosenColumnName = items[index];
    const curtColumns = [...curtReportConfig.colums];
    curtColumns.push({
      dataField: chosenColumnName,
      caption: chosenColumnName,
    });
    setCurtReportConfig({ ...curtReportConfig, colums: curtColumns });
  };

  const onItemClick = (event) => {
    const index = event.currentTarget.dataset.index;
    addColumn(index);
    toggleDropDown();
  };

  // - Dropdown Items rendering -
  const DropdownItems = items
    ? items.map((item, index) => {
        return (
          <li key={index} data-index={index} onClick={onItemClick}>
            <a href="#">{item}</a>
          </li>
        );
      })
    : null;

  return (
    <div className="ui centered card" ref={dropRef}>
      <div className={dropdown ? "dropdown open" : "dropdown"}>
        <button
          className="fluid ui centered button dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          onClick={toggleDropDown}
        >
          Add column <i className="ui right plus icon"></i>
        </button>
        <ul
          style={{ width: "100%", textAlign: "center" }}
          className="dropdown-menu"
        >
          {DropdownItems}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
