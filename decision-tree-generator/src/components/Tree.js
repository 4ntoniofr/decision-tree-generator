function Tree({treeAccuracy, appState, setAppState}) {
  return (
    <>
      {appState === "tree" ? <p className="accuracy">Tree accuracy: {treeAccuracy * 100}%</p> : null}
      <div id="tree"></div>
    </>
  );
}

export default Tree;
