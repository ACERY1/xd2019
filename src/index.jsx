import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute, Link } from "react-router";

import App from "./components/App";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Message from "./pages/MessageBoard";
import MessageWrite from "./pages/MessageWrite";
import Slide from "./pages/Slide";
import Share from "./pages/Share";

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
    <Route path="/" component={Loading}></Route>
    <Route path="/home" component={Slide}></Route>
    <Route path="/message" component={Message}></Route>
    <Route path="/messageWrite" component={MessageWrite}></Route>
    <Route path="/share/:msgId" component={Share}></Route>
  </Router>,
  document.getElementById("example")
);
