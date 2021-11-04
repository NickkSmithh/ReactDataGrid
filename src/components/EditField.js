import React from "react";
import "./EditField.css";

const editField = (props) => {
  /*
   defaultColumnNames={defaultColumnNames}
   curtColumns={curtReportConfig.colums}
   updateCurtColumns={updateCurtColumns}
   */
  return (
    <div className="ui stackable cards">
      <div className="ui centered card">
        <div className="content">
          <div className="center aligned header">Columns list:</div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default editField;
