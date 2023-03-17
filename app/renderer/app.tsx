import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Title from "./Title";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <div>颖的可视化简历平台</div>
          <div>技术栈: Electron + React </div>
          <Title text="1" />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
