import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage({ appState, setAppState }) {
  useEffect(() => {
    if (appState !== "home") {
      setAppState("home");
    }
  }, [appState, setAppState]);

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  return (
    <form className="homePageForm">
      <h2>Please, select how to enter data</h2>
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setAppState("column");
            routeChange("insertColumns");
          }}
        >
          Manual mode
        </button>
        <button
          type="button"
          onClick={() => {
            routeChange("/csv");
          }}
        >
          .CSV file
        </button>
      </div>
    </form>
  );
}

export default HomePage;
