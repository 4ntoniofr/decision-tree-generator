function Title({ appState }) {
  if (appState === "home") {
    return (
      <h1 className="homeTitle">
        <span>Decision Tree</span>
        <span>Generator</span>
      </h1>
    );
  } else {
    return (
      <a href="/">
        <h1 className="title">DECISION TREE GENERATOR</h1>
      </a>
    );
  }
}

export default Title;
