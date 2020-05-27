import React, { Component } from "react";
import _ from "lodash";
import withFive9Data from "../HOC/withFive9Data";
import Moment from "react-moment";

class TodayStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longQueue: false,
    };
  }

  longQueue = (time) => {
    const data = time.split(":");
    // console.log(parseInt(data[2]), parseInt(data[1]));
    // console.log(data)
    return parseInt(data[2]) >= 30 || parseInt(data[1]) >= 1;
  };

  abandonedCalls = (arr) => {
    return _.sumBy(arr, "abandoned_calls");
  };

  render() {
    console.log(this.props);
    var queueData = this.props.queue_data;
    queueData = queueData || [];
    const show = this.longQueue(
      queueData.length ? queueData[0].longest_queue_time : ""
    );

    var hourData = this.props.data_sixty_min;
    hourData = hourData || [];
    let longestQueueInHour = hourData.last_60_longest_queue;

    var IBData = this.props.IB_data;
    IBData = IBData || [];
    const AC = this.abandonedCalls(IBData.length ? IBData : "");
    const now = new Date();
    return (
      <div className="todayStats">
        {show
          ? queueData.map((data) => (
              <h7 className="statName">
                <h7
                  style={{
                    color: "#42454a",
                    borderBottom: "1px solid #58595b",
                  }}
                >
                  <span>Longest Queue:</span> Today
                </h7>
                {data.longest_queue_time.substring(0, 8)}
              </h7>
            ))
          : null}
        {longestQueueInHour ? (
          <h7 className="statName">
            <h7 style={{ color: "#42454a", borderBottom: "1px solid #58595b" }}>
              <span>Longest Queue:</span>
              <span>
                <Moment subtract={{ hours: 1 }} format="h a">
                  {now}
                </Moment>
                -<Moment format="h a">{now}</Moment>
              </span>
            </h7>
            {longestQueueInHour}
          </h7>
        ) : null}
        {AC ? (
          <h7 className="statName">
            <h7 style={{ color: "#42454a", borderBottom: "1px solid #58595b" }}>
              <span>Abandoned Calls:</span> Today
            </h7>
            {AC}
          </h7>
        ) : null}
      </div>
    );
  }
}

export default withFive9Data(TodayStats);
