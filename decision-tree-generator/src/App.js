import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Title from "./components/Title";
import DefiningCsvPage from "./pages/DefiningCsvPage";
import Notification from "./components/Notification";
import HomePage from "./pages/HomePage";
import InsertColumnsPage from "./pages/InsertColumnsPage";
import InsertDataPage from "./pages/InsertDataPage";
import CsvInputPage from "./pages/CsvInputPage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [appState, setAppState] = useState("");
  const [columns, setColumns] = useState([]);
  const [columnsTypes, setColumnsTypes] = useState([]);
  const [dataInputs, setDataInputs] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [dataFormated, setDataFormated] = useState(new Map());
  const [mainColumn, setMainColumn] = useState("");
  const [treeAccuracy, setTreeAccuracy] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  /* useEffect(() => {
    setColumns(["Sky", "Temperature", "Humidity", "Wind", "PlayTennis"]);
    setColumnsTypes([
      "discrete",
      "continuous",
      "continuous",
      "discrete",
      "discrete",
    ]);
    setDataInputs(["", "", "", "", ""]);
    setDataTable([
      ["Sunny", "30", "85", "Weak", "No"],
      ["Sunny", "26", "90", "Strong", "No"],
      ["Cloudy", "28", "78", "Weak", "Yes"],
      ["Rainy", "21", "96", "Weak", "Yes"],
      ["Rainy", "20", "80", "Weak", "Yes"],
      ["Rainy", "18", "70", "Strong", "No"],
      ["Cloudy", "17.7", "65", "Strong", "Yes"],
      ["Sunny", "22", "95", "Weak", "No"],
      ["Sunny", "20.5", "70", "Weak", "Yes"],
      ["Rainy", "24", "80", "Weak", "Yes"],
      ["Sunny", "24", "70", "Strong", "Yes"],
      ["Cloudy", "22", "90", "Strong", "Yes"],
      ["Cloudy", "27", "75", "Weak", "Yes"],
      ["Rainy", "21.6", "80", "Strong", "No"],
    ]);
    setDataFormated(
      new Map([
        [
          "Sky",
          new Map([
            ["Sunny", 5],
            ["Cloudy", 4],
            ["Rainy", 5],
          ]),
        ],
        [
          "Wind",
          new Map([
            ["Weak", 8],
            ["Strong", 6],
          ]),
        ],
        [
          "PlayTennis",
          new Map([
            ["No", 5],
            ["Yes", 9],
          ]),
        ],
      ])
    );
  }, []); */

  useEffect(() => {
    require("treant-js/Treant.css");
    window.Raphael = require("treant-js/vendor/raphael");
    require("treant-js/vendor/jquery.min");
    require("treant-js/vendor/jquery.easing");
    require("treant-js/vendor/jquery.mousewheel");
    require("treant-js");
  }, []);

  return (
    <>
      <Title appState={appState} />
      <Notification
        message={message}
        setMessage={setMessage}
        messageType={messageType}
        setMessageType={setMessageType}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage appState={appState} setAppState={setAppState} />}
          />
          <Route
            path="/insertColumns"
            element={
              <InsertColumnsPage
                appState={appState}
                setAppState={setAppState}
                columns={columns}
                setColumns={setColumns}
                columnsTypes={columnsTypes}
                setColumnsTypes={setColumnsTypes}
                setMessage={setMessage}
                setMessageType={setMessageType}
                dataInputs={dataInputs}
                setDataInputs={setDataInputs}
                dataFormated={dataFormated}
                setDataFormated={setDataFormated}
                dataTable={dataTable}
                setDataTable={setDataTable}
              />
            }
          />
          <Route
            path="/insertData"
            element={
              columns && columns.length > 0 ? (
                <InsertDataPage
                  columns={columns}
                  setColumns={setColumns}
                  columnsTypes={columnsTypes}
                  dataFormated={dataFormated}
                  setDataFormated={setDataFormated}
                  dataInputs={dataInputs}
                  setDataInputs={setDataInputs}
                  dataTable={dataTable}
                  setDataTable={setDataTable}
                  appState={appState}
                  setAppState={setAppState}
                  setMessage={setMessage}
                  setMessageType={setMessageType}
                />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />

          <Route
            path="/csv"
            element={
              <CsvInputPage
                appState={appState}
                setAppState={setAppState}
                setColumns={setColumns}
                setDataTable={setDataTable}
                setDataInputs={setDataInputs}
                setMessage={setMessage}
                setMessageType={setMessageType}
                columns={columns}
                columnsTypes={columnsTypes}
                dataInputs={dataInputs}
                dataTable={dataTable}
                dataFormated={dataFormated}
                setDataFormated={setDataFormated}
              />
            }
          />

          <Route
            path="/definingCsv"
            element={
              <DefiningCsvPage
                appState={appState}
                dataTable={dataTable}
                columns={columns}
                setColumnsTypes={setColumnsTypes}
                setColumns={setColumns}
                columnsTypes={columnsTypes}
                dataInputs={dataInputs}
                setDataInputs={setDataInputs}
                data={dataTable}
                dataFormated={dataFormated}
                setDataFormated={setDataFormated}
                setData={setDataTable}
              />
            }
          />

          <Route
            path="/results"
            element={
              dataTable && dataTable.length > 0 ? (
                <ResultPage
                  columns={columns}
                  setColumns={setColumns}
                  dataInputs={dataInputs}
                  setDataInputs={setDataInputs}
                  columnsTypes={columnsTypes}
                  appState={appState}
                  setAppState={setAppState}
                  mainColumn={mainColumn}
                  setMainColumn={setMainColumn}
                  data={dataTable}
                  dataMap={dataFormated}
                  setDataMap={setDataFormated}
                  treeAccuracy={treeAccuracy}
                  setTreeAccuracy={setTreeAccuracy}
                  setMessage={setMessage}
                  setMessageType={setMessageType}
                />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );

  /* <div>
      <Title appState={appState}></Title>
      <Notification
        message={message}
        setMessage={setMessage}
        messageType={messageType}
        setMessageType={setMessageType}
      ></Notification>
      <HomePageForm
        appState={appState}
        setAppState={setAppState}
      ></HomePageForm>
      <CsvInput
        appState={appState}
        setAppState={setAppState}
        setColumns={setColumns}
        setDataTable={setDataTable}
        setDataInputs={setDataInputs}
        setMessage={setMessage}
        setMessageType={setMessageType}
      ></CsvInput>
      <DefiningCsvData
        appState={appState}
        data={dataTable}
        columns={columns}
        setColumnsTypes={setColumnsTypes}
      ></DefiningCsvData>
      <NewColumnForm
        newColumn={newColumn}
        setNewColumn={setNewColumn}
        appState={appState}
        setAppState={setAppState}
        columns={columns}
        setColumns={setColumns}
        columnsTypes={columnsTypes}
        setColumnsTypes={setColumnsTypes}
        setMessage={setMessage}
        setMessageType={setMessageType}
        dataInputs={dataInputs}
        setDataInputs={setDataInputs}
        dataFormated={dataFormated}
        setDataFormated={setDataFormated}
      ></NewColumnForm>
      <NewDataForm
        columns={columns}
        columnsTypes={columnsTypes}
        dataFormated={dataFormated}
        setDataFormated={setDataFormated}
        dataInputs={dataInputs}
        setDataInputs={setDataInputs}
        dataTable={dataTable}
        setDataTable={setDataTable}
        appState={appState}
        setAppState={setAppState}
        setMessage={setMessage}
        setMessageType={setMessageType}
      ></NewDataForm>
      <Results
        columns={columns}
        columnsTypes={columnsTypes}
        appState={appState}
        setAppState={setAppState}
        mainColumn={mainColumn}
        setMainColumn={setMainColumn}
        data={dataTable}
        dataMap={dataFormated}
        setTreeAccuracy={setTreeAccuracy}
        setMessage={setMessage}
        setMessageType={setMessageType}
      ></Results>
      <Tree
        treeAccuracy={treeAccuracy}
        appState={appState}
        setAppState={setAppState}
      ></Tree>
      <TableData
        columns={columns}
        setColumns={setColumns}
        columnsTypes={columnsTypes}
        dataInputs={dataInputs}
        setDataInputs={setDataInputs}
        data={dataTable}
        dataFormated={dataFormated}
        setDataFormated={setDataFormated}
        setData={setDataTable}
        appState={appState}
      ></TableData>
    </div> */
}

export default App;
