function CsvFileInput({ appState, setAppState, csvFile, setCsvFile }) {
  return (
    <>
        <input type={"file"} value={csvFile} onChange={(event)=>{setCsvFile(event.target.value)}}></input>
      <p>{csvFile}</p>
    </>
  );
}

export default CsvFileInput;
