import React, { useEffect, useState } from "react";
import EditField from "./EditField";
import "./CustomDataGrid.css";
import RedactColumnField from "./RedactColumnField";
import DropdownMenu from "./DropdownMenu";

import DataGrid, {
  Column,
  ColumnChooser,
  ColumnFixing,
} from "devextreme-react/data-grid";

import service from "../data.js";

//config and data
import reportConfig from "../report-config.json";
const gridData = service.getEmployees();

const CustomDataGrid = (props) => {
  //Colums
  // const gridData = service.getEmployees();
  const defaultColumnNames = Object.keys(gridData[0]);

  // Creating state report config
  const [curtReportConfig, setCurtReportConfig] = useState(reportConfig);
  const [displayColumns, setDisplayColumns] = useState(false);

  // change column name, passed to RedactColumnField

  //Logging
  useEffect(() => {
    //console.log("curtReportConfig: ", curtReportConfig);
    //console.log(  "columns",curtReportConfig.colums.map((col_parms) => col_parms.dataField));
  }, [curtReportConfig]);

  useEffect(() => {});

  // - Render Lists -

  //render Columns list

  const renderColumns = () => {
    return curtReportConfig.colums.map((col_parms, index) => {
      // If caption is empty, fill it with dataField
      const columnCaption = col_parms.caption
        ? col_parms.caption
        : col_parms.dataField;
      return <Column key={index} {...col_parms} caption={columnCaption} />;
    });
  };

  //render RedactColumnField list
  const renderColumnFields = curtReportConfig.colums.map((col_parms, index) => {
    // If caption is empty, fill it with dataField
    if (Object.keys(col_parms).length) {
      const columnCaption = col_parms.caption
        ? col_parms.caption
        : col_parms.dataField;
      return (
        <RedactColumnField
          data-index={index}
          indexValue={index}
          key={index}
          name={columnCaption}
          curtReportConfig={curtReportConfig}
          setCurtReportConfig={setCurtReportConfig}
          columns={curtReportConfig.colums.map(
            (col_parms) => col_parms.dataField
          )}
        />
      );
    }
  });

  //test
  const TEST = () => {
    //saveFile("test");
  };

  return (
    <div className="">
      <h1 className="ui center aligned header" style={{ marginTop: "7px" }}>
        Report Name:{" "}
        {reportConfig.name ? reportConfig.name : "Empty config name"}
      </h1>
      <div onClick={TEST} className="header_content content">
        Report Window
      </div>
      <div className="ui divider"></div>

      {/*DataGrid and EditField, styled */}
      <div className="grid_div">
        <div className="ui stackable two column grid main_grid ">
          <div className="row">
            <div className="thirteen wide column">
              <DataGrid
                id="gridContainer"
                dataSource={curtReportConfig.colums.length > 0 ? gridData : ""}
                keyExpr="ID"
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                showBorders={true}
                //columns={curtReportConfig.colums.map(
                // (col_parms) => col_parms.dataField
                //)}
              >
                {/* Display columns */}
                {curtReportConfig.colums.length > 0 ? renderColumns() : null}
                <ColumnFixing enabled={true} />
                <ColumnChooser />
              </DataGrid>
            </div>
            <div className="three wide column">
              {/* EditField to the right of the sheet*/}
              <EditField>
                {renderColumnFields}
                <DropdownMenu
                  items={defaultColumnNames}
                  curtReportConfig={curtReportConfig}
                  setCurtReportConfig={setCurtReportConfig}
                />
              </EditField>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDataGrid;
