import { useNavigate } from "react-router-dom";

function NewDataForm({
  columns,
  columnsTypes,
  dataInputs,
  setDataInputs,
  dataTable,
  setDataTable,
  dataFormated,
  setDataFormated,
  setMessage,
  setMessageType,
}) {
  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const handleAdd = (event) => {
    event.preventDefault();

    for (let i = 0; i < dataInputs.length; i++) {
      if (dataInputs[i].trim() === "") {
        setMessageType("error");
        setMessage("Insert valid values in every column");
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
        return;
      } else if (
        columnsTypes[i] === "continuous" &&
        Number.isNaN(+dataInputs[i].trim())
      ) {
        setMessageType("error");
        setMessage(
          `The value of ${columns[i]} which has been marked as continuous must be a number Ej:12345.6789`
        );
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
        return;
      }
    }
    let copy = dataTable.slice();
    copy.push(dataInputs);
    setDataTable(copy);

    dataInputs.forEach((input, i) => {
      if (columnsTypes[i] === "discrete") {
        dataFormated
          .get(columns[i])
          .set(input, (dataFormated.get(columns[i]).get(input) || 0) + 1);
      }
    });

    setDataFormated(dataFormated);

    setDataInputs(dataInputs.map(() => ""));
  };

  const obtainDataList = (column) => {
    return Array.from(dataFormated.get(column).keys()).map((key, id) => (
      <option key={id} value={key}></option>
    ));
  };

  const handleNext = () => {
    if (dataTable[0] && dataTable[0].length > 0) {
      routeChange("/results")
    } else {
      setMessageType("error");
      setMessage("Insert at least one instance");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

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
              <datalist id={column}>
                {columnsTypes[id] === "discrete"
                  ? obtainDataList(column)
                  : null}
              </datalist>
            </div>
          ))}
        </div>
        <div className="buttonZone">
          <button className="insertButton" type="submit">
            Add data
          </button>
          <button className="nextButton" type="button" onClick={handleNext}>
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewDataForm;
