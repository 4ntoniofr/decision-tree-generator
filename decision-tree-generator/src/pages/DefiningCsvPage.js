import DefiningCsvData from "../components/DefiningCsvData";
import TableData from "../components/TableData";

export default function DefiningCsvPage({
  appState,
  dataTable,
  columns,
  setColumnsTypes,
  setColumns,
  columnsTypes,
  dataInputs,
  setDataInputs,
  dataFormated,
  setDataFormated,
  setDataTable,
}) {
  return (
    <>
      <DefiningCsvData
        appState={appState}
        data={dataTable}
        columns={columns}
        setColumnsTypes={setColumnsTypes}
        setDataFormated={setDataFormated}
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
