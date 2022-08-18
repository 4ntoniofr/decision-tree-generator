import { useState } from "react";
import NewColumnForm from "./components/NewColumnForm";
import TableData from "./components/TableData";
import Notification from "./components/Notification";
import NewDataForm from "./components/NewDataForm";

function App() {
  const [appState, setAppState] = useState("column");
  const [message, setMessage] = useState(null);
  const [newColumn, setNewColumn] = useState("");
  const [columns, setColumns] = useState([]);
  const [dataInputs, setDataInputs] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [dataFormated, setDataFormated] = useState([]);
  const [messageType, setMessageType] = useState(null);

  return (
    <div>
      <h1 className="title">DECISION TREE GENERATOR</h1>
      <Notification
        message={message}
        setMessage={setMessage}
        messageType={messageType}
        setMessageType={setMessageType}
      ></Notification>
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
      ></NewColumnForm>
      <NewDataForm
        columns={columns}
        data={dataFormated}
        setData={setDataFormated}
        dataInputs={dataInputs}
        setDataInputs={setDataInputs}
        dataTable={dataTable}
        setDataTable={setDataTable}
        appState={appState}
        setAppState={setAppState}
      ></NewDataForm>
      <TableData
        columns={columns}
        setColumns={setColumns}
        dataInputs={dataInputs}
        setDataInputs={setDataInputs}
        data={dataTable}
        setData={setDataTable}
        appState={appState}
      ></TableData>
    </div>
  );
}

export default App;
