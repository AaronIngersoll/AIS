import React, { Component } from "react";
import withFive9Data from "../HOC/withFive9Data";

class LongestQueueTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longQueue: false
    };
  }

  longQueue = time => {
    const data = time.split(":");
    console.log(parseInt(data[2]), parseInt(data[1]));
    return parseInt(data[2]) >= 30 || parseInt(data[1]) >= 1;
  };
  render() {
    let { data } = this.props;
    data = data || [];
    // const show = this.longQueue(data);
    const show2 = this.longQueue(data.length ? data[0].longest_queue_time : "");
    console.log(data);
    console.log(show2);
    return (
      <div className="longest_queue_time">
        {show2
          ? data.map(data => (
              <h7
                className="badDisplay"
                style={{
                  color: "#922a2a",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <h7 style={{ color: "#42454a" }}>Longest Queue Time Today:</h7>

                {data.longest_queue_time.substring(0, 8)}
              </h7>
            ))
          : null}
      </div>
    );
  }
}

export default withFive9Data(LongestQueueTime);
