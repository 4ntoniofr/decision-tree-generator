import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DefiningCsvData({
  appState,
  data,
  columns,
  setColumnsTypes,
  setDataFormated,
}) {
  const [inputsColumnsTypes, setInputsColumnsTypes] = useState([]);

  useEffect(() => {
    const inputs = [];
    for (let i = 0; i < columns.length; i++) {
      inputs.push("discrete");
    }
    setInputsColumnsTypes(inputs);
  }, [columns.length]);

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const handleNext = () => {
    setColumnsTypes(inputsColumnsTypes);

    const dataFormated = new Map();

    columns.forEach(column => {
      dataFormated.set(column, new Map());
    })
    setDataFormated(dataFormated);

    data.forEach((instance) => {
      instance.forEach((column, i) => {
        if (inputsColumnsTypes[i] === "discrete") {
          dataFormated
            .get(columns[i])
            .set(column, (dataFormated.get(columns[i]).get(column) || 0) + 1);
        }
      });
    });
    setDataFormated(dataFormated);
    routeChange("/results")
  };

  return (
    <>
      <h2 className="typeTitle">Select the type of every column</h2>
      <form className="typeInputs">
        {columns.map((column, id) => (
          <div key={id}>
            <label>{column}</label>
            <select
              required
              value={inputsColumnsTypes[id]}
              onChange={(event) =>
                setInputsColumnsTypes(
                  inputsColumnsTypes.map((input, idInput) => {
                    if (idInput === id) {
                      return event.target.value;
                    } else {
                      return input;
                    }
                  })
                )
              }
            >
              <option value={"discrete"}>Discrete</option>
              <option value={"continuous"}>Continuous</option>
            </select>
          </div>
        ))}
      </form>
      <div className="buttons">
        <button className="next" type="button" onClick={handleNext}>
          Next Step
        </button>
      </div>
    </>
  );
}

export default DefiningCsvData;
