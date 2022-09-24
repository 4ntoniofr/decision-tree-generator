function TableData({
  columns,
  setColumns,
  columnsTypes,
  dataInputs,
  setDataInputs,
  data,
  dataFormated,
  setDataFormated,
  setData,
  appState,
}) {
  const state = window.location.pathname;

  const handleDeleteColumn = (deleteColumn) => {
    if (columns.includes(deleteColumn)) {
      const columIndex = columns.findIndex((column) => column === deleteColumn);
      setColumns(columns.filter((column) => column !== deleteColumn));
      const dataCopy = [...data];
      dataCopy.forEach((instance, i) => {
        dataCopy[i] = instance.filter((column, j) => columIndex !== j);
      });
      setData(dataCopy);
      if (state !== "/csv") {
        dataFormated.delete(deleteColumn);
        setDataFormated(dataFormated);
        let copy = dataInputs.slice();
        copy.pop();
        setDataInputs(copy);
      }
    }
  };

  const handleDeleteRow = (deleteRow) => {
    if (data.includes(deleteRow)) {
      setData(data.filter((row) => row !== deleteRow));
      if (state !== "/csv") {
        deleteRow.forEach((element, i) => {
          if (dataFormated.get(columns[i]).get(element) <= 1) {
            dataFormated.get(columns[i]).delete(element);
          } else {
            dataFormated
              .get(columns[i])
              .set(element, dataFormated.get(columns[i]).get(element) - 1);
          }
        });
        setDataFormated(dataFormated);
      }
    }
  };

  return (
    <div className="tableContainer">
      <table className="dataTable">
        <thead>
          <tr className="headRow">
            {columns.map((column, id) => (
              <th key={id}>
                <div>
                  <p className="columnName">{column}</p>
                  <p className="columnType">{columnsTypes[id]}</p>
                </div>
                {state === "/csv" || state === "/insertColumns" ? (
                  <button
                    className="deleteButton"
                    type="button"
                    onClick={() => {
                      handleDeleteColumn(column);
                    }}
                  >
                    Remove
                  </button>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        {
          <tbody>
            {data.map((example, exId) => {
              return (
                <tr key={exId}>
                  {example.map((elem, id) => (
                    <td key={(exId + 1) * (id + 1)}>{elem}</td>
                  ))}
                  {state === "/csv" || state === "/insertData" ? (
                    <td className="buttonCell">
                      <button
                        className="deleteButton"
                        type="button"
                        onClick={() => {
                          handleDeleteRow(example);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        }
      </table>
    </div>
  );
}

export default TableData;
