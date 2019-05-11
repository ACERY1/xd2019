import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute, Link } from "react-router";

import App from "./components/App";
import Stage1 from "./components/Stage1";
import Stage2 from "./components/Stage2";
import Stage3 from "./components/Stage3";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import MessageWrite from "./pages/MessageWrite";

import "./index.less";

class Index extends React.Component {
  render() {
    return (
      <div className="body">
        {/**
        <h1>Stages list</h1>
        <ul role="nav">
          <li>
            <Link to="/s1">ListView + Carousel</Link>
          </li>
          <li>
            <Link to="/s2">Tabs + ...</Link>
          </li>
          <li>
            <Link to="/s3">Form + ...</Link>
          </li>
        </ul>
         */}
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home}></Route>
    <Route path="/loading" component={Loading}></Route>
    <Route path="/write" component={MessageWrite}></Route>
  </Router>,
  document.getElementById("example")
);
