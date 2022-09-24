import Results from "../components/Results";
import Tree from "../components/Tree";
import TableData from "../components/TableData";
function ResultPage({
  columns,
  setColumns,
  dataInputs,
  setDataInputs,
  columnsTypes,
  appState,
  setAppState,
  mainColumn,
  setMainColumn,
  data,
  setData,
  dataMap,
  setDataMap,
  treeAccuracy,
  setTreeAccuracy,
  setMessage,
  setMessageType,
}) {
  return (
    <>
      <Results
        columns={columns}
        columnsTypes={columnsTypes}
        appState={appState}
        setAppState={setAppState}
        mainColumn={mainColumn}
        setMainColumn={setMainColumn}
        data={data}
        dataMap={dataMap}
        setTreeAccuracy={setTreeAccuracy}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
      <Tree
        treeAccuracy={treeAccuracy}
        appState={appState}
        setAppState={setAppState}
      />
      <TableData
        columns={columns}
        setColumns={setColumns}
        columnsTypes={columnsTypes}
        dataInputs={dataInputs}
        setDataInputs={setDataInputs}
        data={data}
        dataFormated={dataMap}
        setDataFormated={setDataMap}
        setData={setData}
        appState={appState}
      />
    </>
  );
}

export default ResultPage;
