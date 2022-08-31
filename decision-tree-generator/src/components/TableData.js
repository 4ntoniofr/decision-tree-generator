function TableData({
  columns,
  setColumns,
  dataInputs,
  setDataInputs,
  data,
  dataFormated,
  setDataFormated,
  setData,
  appState,
}) {
  const handleDeleteColumn = (deleteColumn) => {
    if (columns.includes(deleteColumn)) {
      setColumns(columns.filter((column) => column !== deleteColumn));
      dataFormated.delete(deleteColumn);
      setDataFormated(dataFormated);
      let copy = dataInputs.slice();
      copy.pop();
      setDataInputs(copy);
    }
  };

  const handleDeleteRow = (deleteRow) => {
    if (data.includes(deleteRow)) {
      setData(data.filter((row) => row !== deleteRow));
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
  };

  return (
    <div>
      <table className="dataTable">
        <thead>
          <tr>
            {columns.map((column, id) => (
              <th key={id}>
                {column}
                {appState === "column" ? (
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
                  {appState === "data" ? (
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
