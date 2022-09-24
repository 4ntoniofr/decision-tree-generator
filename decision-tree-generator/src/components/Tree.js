function Tree({ treeAccuracy, appState, setAppState }) {
  return (
    <>
      {appState === "tree" ? (
        <div className="accuracy">
          <p>Tree accuracy: {treeAccuracy * 100}%</p>
        </div>
      ) : null}
      <div id="tree"></div>
    </>
  );
}

export default Tree;
