import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parse } from "papaparse";

function CsvInput({
  appState,
  setAppState,
  setColumns,
  setDataTable,
  setDataInputs,
  setMessage,
  setMessageType,
}) {
  const [uploadWay, setUploadWay] = useState("");
  const [inputURL, setInputURL] = useState("");
  const [csvUploaded, setCsvUploaded] = useState(false);

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const handleUpload = (event) => {
    const csvToData = (csvData) => {
      if (csvData.length > 0) {
        setColumns(Object.keys(csvData[0]));
        const dataInputs = [];
        for (let i = 0; i < Object.keys(csvData[0]).length; i++) {
          dataInputs.push("");
        }
        setDataInputs(dataInputs);
        const dataTable = [];
        csvData.forEach((instance) => {
          dataTable.push(Object.values(instance));
        });
        setDataTable(dataTable);
      }
    };

    event.preventDefault();
    if (uploadWay === "file") {
      //TODO: Comprobar integridad del archivo
      parse(document.getElementById("csvInputFile").files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          csvToData(results.data);
        },
      });
      setCsvUploaded(true);
      setMessageType("success");
      setMessage("CSV file uploaded successfuly");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } else if (uploadWay === "url") {
      parse(inputURL, {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log(results);
        },
      });
    }
  };

  return (
    <form className="csvForm" onSubmit={handleUpload}>
      <h2>How will you upload the CSV file?</h2>

      <select
        value={uploadWay}
        onChange={(event) => {
          setUploadWay(event.target.value);
        }}
      >
        <option value={""}>Select a way to upload the file</option>
        <option value={"url"}>By an URL</option>
        <option value={"file"}>By a file</option>
      </select>
      {uploadWay === "file" ? (
        <input id="csvInputFile" type={"file"} accept={".csv"}></input>
      ) : null}
      {uploadWay === "url" ? (
        <input
          type={"url"}
          placeholder={"http://www.example.com"}
          value={inputURL}
          onChange={(event) => {
            setInputURL(event.target.value);
          }}
        ></input>
      ) : null}
      <div className="buttons">
        {uploadWay !== "" ? (
          <button className="upload" type="submit">
            Upload
          </button>
        ) : null}
        {csvUploaded ? (
          <button
            className="next"
            type="button"
            onClick={() => {
              routeChange("/definingCsv")
            }}
          >
            Next Step
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default CsvInput;
