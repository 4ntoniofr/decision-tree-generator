function NewDataForm({
  columns,
  dataInputs,
  setDataInputs,
  dataTable,
  setDataTable,
  appState,
  setAppState,
  dataFormated,
  setDataFormated,
}) {
  const handleAdd = (event) => {
    event.preventDefault();
    let copy = dataTable.slice();
    copy.push(dataInputs);
    setDataTable(copy);

    dataInputs.forEach((input, i) => {
      dataFormated
        .get(columns[i])
        .set(input, (dataFormated.get(columns[i]).get(input) || 0) + 1);
    });

    setDataFormated(dataFormated);

    setDataInputs(dataInputs.map(() => ""));
  };

  const obtainDataList = (column) => {
    return Array.from(dataFormated.get(column).keys()).map((key, id) => (
      <option key={id} value={key}></option>
    ));
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
                  list={column}
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
                <datalist id={column}>{obtainDataList(column)}</datalist>
              </div>
            ))}
          </div>

          <button className="insertButton" type="submit">
            Add data
          </button>
          <button className="nextButton" type="button" onClick={() => {setAppState("results")}}>
            Obtain results
          </button>
        </form>
      </div>
    );
  }
}

export default NewDataForm;
