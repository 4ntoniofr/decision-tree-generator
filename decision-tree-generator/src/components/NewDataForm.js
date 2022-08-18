function NewDataForm({
  columns,
  dataInputs,
  setDataInputs,
  dataTable,
  setDataTable,
  appState,
  setAppState,
}) {
  const handleAdd = (event) => {
    event.preventDefault();
    let copy = dataTable.slice();
    copy.push(dataInputs);
    setDataTable(copy);
    setDataInputs(dataInputs.map(() => ""));
  };
  if (appState === "data") {
    return (
      <div>
        <form className="addForm" onSubmit={handleAdd}>
          <h2>Insert new data</h2>
          <div className="dataInputs">
            {columns.map((column, id) => (
              <div key={id}>
                <label>{column}</label>
                <input
                  required
                  value={dataInputs[id]}
                  type={"text"}
                  onChange={(event) => {
                    setDataInputs(
                      dataInputs.map((input, idInput) => {
                        if (idInput === id) {
                          return event.target.value;
                        } else {
                          return input;
                        }
                      })
                    );
                  }}
                ></input>
              </div>
            ))}
          </div>
          <button className="insertButton" type="submit">
            Add data
          </button>
          <button className="nextButton" type="button">
            Obtain results
          </button>
        </form>
      </div>
    );
  }
}

export default NewDataForm;
