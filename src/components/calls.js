import React, { Component } from "react";
import withFive9Data from "../HOC/withFive9Data";

class Calls extends Component {
  render() {
    let { data } = this.props;
    data = data || [];
    return (
      <div className="App">
        {data.map((data, i) => (
          <h1 key={i} className="calls_in_queue">
            {data.calls_in_queue}
          </h1>
        ))}
      </div>
    );
  }
}

export default withFive9Data(Calls);
