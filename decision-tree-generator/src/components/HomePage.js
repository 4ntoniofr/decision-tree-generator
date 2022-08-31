function HomePage({ appState, setAppState }) {
  if (appState === "input") {
    return (
      <form className="homePageForm">
        <h2>Select how to enter data</h2>
        <div className="buttons">
          <button type="button" onClick={() => {
            setAppState("column")
          }}>Manual mode</button>
          <button type="button">.CSV file</button>
        </div>
      </form>
    );
  }
}

export default HomePage;
