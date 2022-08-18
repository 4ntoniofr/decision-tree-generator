function TableData({
  columns,
  setColumns,
  dataInputs,
  setDataInputs,
  data,
  setData,
  appState,
}) {
  const handleDeleteColumn = (deleteColumn) => {
    if (columns.includes(deleteColumn)) {
      setColumns(columns.filter((column) => column !== deleteColumn));
    }
    let copy = dataInputs.slice();
    copy.pop();
    setDataInputs(copy);
  };

  const handleDeleteRow = (deleteRow) => {
    if (data.includes(deleteRow)) {
      setData(data.filter((row) => row !== deleteRow));
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
                    Delete
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
                        Delete
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
