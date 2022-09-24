import NewDataForm from "../components/NewDataForm";
import TableData from "../components/TableData";

function InsertDataPage({
  columns,
  setColumns,
  columnsTypes,
  dataInputs,
  setDataInputs,
  dataTable,
  setDataTable,
  appState,
  setAppState,
  dataFormated,
  setDataFormated,
  setMessage,
  setMessageType,
}) {
  return (
    <>
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

export default InsertDataPage;
