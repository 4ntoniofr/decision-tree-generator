function NewColumnForm({
  newColumn,
  setNewColumn,
  appState,
  setAppState,
  columns,
  setColumns,
  setMessage,
  setMessageType,
  dataInputs,
  setDataInputs,
}) {
  const handleAdd = (event) => {
    event.preventDefault();
    if (newColumn !== "" && !columns.includes(newColumn)) {
      setColumns(columns.concat(newColumn));
      setNewColumn("");
      setDataInputs(dataInputs.concat(""));
      window.onbeforeunload = function () {
        return "Would you like to reload the page?";
      };
    } else if (newColumn === "") {
      setMessageType("error");
      setMessage("Columns' names must not be blank");
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
    if (columns.length > 0) {
      setAppState("data");
    } else {
      setMessageType("error");
      setMessage(`Please, add at least one column to continue`);
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  if (appState === "column") {
    return (
      <div className="addForm">
        <h2>Insert new column:</h2>
        <form onSubmit={handleAdd}>
          <input
            className="newData"
            type="text"
            value={newColumn}
            onChange={(event) => {
              setNewColumn(event.target.value);
            }}
          />
          <button className="insertButton" type="submit">
            Insert column
          </button>
          <button type="button" className="nextButton" onClick={handleNextStep}>
            Next Step
          </button>
        </form>
      </div>
    );
  }
}

export default NewColumnForm;
