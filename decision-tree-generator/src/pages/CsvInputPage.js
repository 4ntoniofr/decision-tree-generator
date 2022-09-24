import { useEffect } from "react";
import CsvInput from "../components/CsvInput";
import TableData from "../components/TableData";

export default function CsvInputPage({
  appState,
  setAppState,
  setColumns,
  setDataTable,
  setDataInputs,
  setMessage,
  setMessageType,
  columns,
  columnsTypes,
  dataInputs,
  dataTable,
  dataFormated,
  setDataFormated,
}) {
  useEffect(() => {
    if (appState !== "csv") {
      setAppState("csv");
    }
  }, [appState, setAppState]);
  return (
    <>
      <CsvInput
        appState={appState}
        setAppState={setAppState}
        setColumns={setColumns}
        setDataTable={setDataTable}
        setDataInputs={setDataInputs}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
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
      />
    </>
  );
}
