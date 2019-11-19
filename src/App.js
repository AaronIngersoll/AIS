import React, { Component } from "react";
import Timer from "./components/timer";
import Calls from "./components/calls";
import Header from "./components/header";
import Navi from "./components/navi";
import LongestQueueTime from "./components/longestQueTime";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navi />
        <Header />
        <Calls />
        <Timer />
        <LongestQueueTime />
      </div>
    );
  }
}
