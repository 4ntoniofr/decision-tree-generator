import ID3Generator from "../utils/Generator";

function Results({
  columns,
  appState,
  setAppState,
  mainColumn,
  setMainColumn,
  data,
  dataMap,
  setTreeAccuracy,
  setMessage,
  setMessageType,
}) {

  const handleGenerate = (event) => {
    event.preventDefault();
    if (mainColumn === "") {
      setMessage("Please, select a column as the main one");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
      return;
    }
    setAppState("tree");
    ID3Generator(columns, mainColumn, data, dataMap, setTreeAccuracy);
  };

  if (appState === "results" || appState === "tree") {
    return (
      <>
        <form className="addForm" onSubmit={handleGenerate}>
          <h2>Select the main column:</h2>
          <select
            name="select"
            className="selectMain"
            value={mainColumn}
            onChange={(event) => {
              setMainColumn(event.target.value);
            }}
          >
            <option value="">Select a column</option>
            {columns.map((column, id) => (
              <option key={id} value={column}>
                {column}
              </option>
            ))}
          </select>
          <button type="submit" className="insertButton">
            Generate Tree
          </button>

          <p>
            <b>Help: </b>A main column is the column which you are looking for
            predict based on the other ones
          </p>
        </form>
      </>
    );
  }
}

export default Results;
