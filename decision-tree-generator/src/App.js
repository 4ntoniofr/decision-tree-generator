import { useState, useEffect } from "react";
import HomePageForm from "./components/HomePage";
import CsvFileInput from "./components/CsvFileInput";
import NewColumnForm from "./components/NewColumnForm";
import TableData from "./components/TableData";
import Notification from "./components/Notification";
import NewDataForm from "./components/NewDataForm";
import Results from "./components/Result";
import Tree from "./components/Tree";

function App() {
  const [appState, setAppState] = useState("column");
  const [csvFile, setCsvFile] = useState(null);
  const [newColumn, setNewColumn] = useState("");
  const [columns, setColumns] = useState([]);
  const [dataInputs, setDataInputs] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [dataFormated, setDataFormated] = useState(new Map());
  const [mainColumn, setMainColumn] = useState("");
  const [treeAccuracy, setTreeAccuracy] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    setColumns(["Sky", "Temperature", "Humidity", "Wind", "PlayTennis"]);
    setDataInputs(["", "", "", "", ""]);
    setDataTable([
      ["Sunny", "High", "High", "Weak", "No"],
      ["Sunny", "High", "High", "Strong", "No"],
      ["Cloudy", "High", "High", "Weak", "Yes"],
      ["Rainy", "Warm", "High", "Weak", "Yes"],
      ["Rainy", "Low", "Normal", "Weak", "Yes"],
      ["Rainy", "Low", "Normal", "Strong", "No"],
      ["Cloudy", "Low", "Normal", "Strong", "Yes"],
      ["Sunny", "Warm", "High", "Weak", "No"],
      ["Sunny", "Low", "Normal", "Weak", "Yes"],
      ["Rainy", "Warm", "Normal", "Weak", "Yes"],
      ["Sunny", "Warm", "Normal", "Strong", "Yes"],
      ["Cloudy", "Warm", "High", "Strong", "Yes"],
      ["Cloudy", "High", "Normal", "Weak", "Yes"],
      ["Rainy", "Warm", "High", "Strong", "No"],
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
          "Temperature",
          new Map([
            ["High", 4],
            ["Warm", 6],
            ["Low", 4],
          ]),
        ],
        [
          "Humidity",
          new Map([
            ["High", 7],
            ["Normal", 7],
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
  }, []);

  useEffect(() => {
    require("treant-js/Treant.css");
    window.Raphael = require("treant-js/vendor/raphael");
    require("treant-js/vendor/jquery.min");
    require("treant-js/vendor/jquery.easing");
    require("treant-js/vendor/jquery.mousewheel");
    require("treant-js");
  }, []);

  return (
    <div>
      <h1 className="title">DECISION TREE GENERATOR</h1>
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
      <CsvFileInput
        appState={appState}
        setAppState={setAppState}
        csvFile = {csvFile}
        setCsvFile = {setCsvFile}
      ></CsvFileInput>
      <NewColumnForm
        newColumn={newColumn}
        setNewColumn={setNewColumn}
        appState={appState}
        setAppState={setAppState}
        columns={columns}
        setColumns={setColumns}
        setMessage={setMessage}
        setMessageType={setMessageType}
        dataInputs={dataInputs}
        setDataInputs={setDataInputs}
        dataFormated={dataFormated}
        setDataFormated={setDataFormated}
      ></NewColumnForm>
      <NewDataForm
        columns={columns}
        dataFormated={dataFormated}
        setDataFormated={setDataFormated}
        dataInputs={dataInputs}
        setDataInputs={setDataInputs}
        dataTable={dataTable}
        setDataTable={setDataTable}
        appState={appState}
        setAppState={setAppState}
      ></NewDataForm>
      <Results
        columns={columns}
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
        dataInputs={dataInputs}
        setDataInputs={setDataInputs}
        data={dataTable}
        dataFormated={dataFormated}
        setDataFormated={setDataFormated}
        setData={setDataTable}
        appState={appState}
      ></TableData>
    </div>
  );
}

export default App;
