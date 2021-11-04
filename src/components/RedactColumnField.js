import React, { useRef, useState, useEffect } from "react";

const RedactColumnField = ({
  curtReportConfig,
  setCurtReportConfig,
  name,
  indexValue,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [form, setForm] = useState(false);
  const formRef = useRef(null);

  const updateColumnName = (newName, index) => {
    const curtColumns = [...curtReportConfig.colums];
    console.log("!!curtColumn caption", curtColumns[indexValue].caption);
    curtColumns[index].caption = newName;
    console.log("!!curtColumns", curtColumns);
    //setCurtReportConfig({ ...curtReportConfig, columns: curtColumns });
    //

    try {
      setCurtReportConfig({ ...curtReportConfig, colums: curtColumns });
    } catch (err) {
      console.log("RedactColumnField: ", err);
    }
  };

  // Handle Clicks Submit, column modification

  const onDeleteClick = (event) => {
    //const index = event.currentTarget.dataset.index;
    const index = indexValue;
    let curtColumns = [...curtReportConfig.colums];
    if (curtColumns.length > 1) {
      curtColumns.splice(index, 1);
    } else {
      curtColumns = [];
    }
    //const curtConf = { ...curtReportConfig };
    setCurtReportConfig({ ...curtReportConfig, colums: curtColumns });
    console.log("deleted");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setForm(false);
    console.log("submited");
    console.log("inputValue", inputValue);
    updateColumnName(inputValue, indexValue);
  };

  const onEditClick = () => {
    setForm(!form);
  };

  //Close form then clicked out
  function handleClick(e) {
    if (formRef.current && !formRef.current.contains(e.target) && form) {
      setForm(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  // Additional rendering

  const renderForm = (
    <form ref={formRef} className="ui form" onSubmit={onSubmit}>
      <div className="field">
        <input
          type="text"
          placeholder="New Column Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
      </div>
      <button className="ui button" type="submit">
        Submit
      </button>
    </form>
  );

  return (
    <div className="ui centered card">
      <div className="content">
        <div className="center aligned description">
          <button
            onClick={onDeleteClick}
            className="compact ui right floated icon button small"
          >
            <i className="trash icon"></i>
          </button>
          <button
            onClick={onEditClick}
            className={`compact ${
              form ? "disabled" : ""
            } ui right floated icon button small`}
          >
            <i className="right floated edit icon"></i>
          </button>
          {form && renderForm}
          <p style={{ marginTop: "5px" }}>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default RedactColumnField;
