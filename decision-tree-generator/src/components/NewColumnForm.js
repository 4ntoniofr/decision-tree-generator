import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewColumnForm({
  setAppState,
  columns,
  setColumns,
  columnsTypes,
  setColumnsTypes,
  setMessage,
  setMessageType,
  dataInputs,
  setDataInputs,
  dataFormated,
  setDataFormated,
}) {
  const [newColumn, setNewColumn] = useState(["", ""]);

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (
      newColumn[0] !== "" &&
      newColumn[1] !== "" &&
      !columns.includes(newColumn)
    ) {
      setColumns(columns.concat(newColumn[0]));
      setColumnsTypes(columnsTypes.concat(newColumn[1]));
      setNewColumn(["", ""]);
      setDataInputs(dataInputs.concat(""));
      if (newColumn[1] === "discrete") {
        setDataFormated(dataFormated.set(newColumn[0], new Map()));
      }
      window.onbeforeunload = function () {
        return "Would you like to reload the page?";
      };
    } else if (newColumn[0] === "") {
      setMessageType("error");
      setMessage("Columns' names must not be blank");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } else if (newColumn[1] === "") {
      setMessageType("error");
      setMessage("Please, select a type for the column");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } else {
      setMessageType("error");
      setMessage("Columns' names must be unique");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const handleNextStep = () => {
    if (columns.length > 0 && columnsTypes.includes("discrete")) {
      setAppState("data");
      routeChange("/insertData");
    } else if (columns.length <= 0) {
      setMessageType("error");
      setMessage(`Please, add at least one column to continue`);
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } else {
      setMessageType("error");
      setMessage("Please, add at least one diecrete column");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  return (
    <div className="addForm">
      <h2>Insert new column:</h2>
      <form onSubmit={handleAdd}>
        <div className="newColumn">
          <input
            type="text"
            value={newColumn[0]}
            onChange={(event) => {
              setNewColumn([event.target.value, newColumn[1]]);
            }}
          />
          <select
            value={newColumn[1]}
            onChange={(event) => {
              setNewColumn([newColumn[0], event.target.value]);
            }}
          >
            <option value={""}>Select the type of the column</option>
            <option value={"discrete"}>Discrete</option>
            <option value={"continuous"}>Continuous</option>
          </select>
        </div>
        <div className="buttonZone">
          <button className="insertButton" type="submit">
            Insert column
          </button>
          <button type="button" className="nextButton" onClick={handleNextStep}>
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewColumnForm;
