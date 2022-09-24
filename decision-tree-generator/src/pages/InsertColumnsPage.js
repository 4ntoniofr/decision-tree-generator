import { useEffect } from "react";
import NewColumnForm from "../components/NewColumnForm";
import TableData from "../components/TableData";

function InsertColumnsPage({
  appState,
  setAppState,
  columns,
  setColumns,
  columnsTypes,
  setColumnsTypes,
  setMessage,
  setMessageType,
  dataInputs,
  setDataInputs,
  dataFormated,
  setDataFormated,
  dataTable,
  setDataTable,
}) {
  useEffect(() => {
    if (appState !== "column") {
      setAppState("column");
    }
  }, [appState, setAppState]);

  return (
    <>
      <NewColumnForm
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
    </>
  );
}

export default InsertColumnsPage;
