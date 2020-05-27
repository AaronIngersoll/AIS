import React, { Component } from "react";
import withFive9Data from "../HOC/withFive9Data";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComponent: false
    };
  }

  componentShow = data =>
    data.map(data => data.calls_in_queue) > 0 ? true : false;

  render() {
    var data = this.props.queue_data;
    data = data || [];
    const show = this.componentShow(data);
    return (
      <div>
        {show
          ? data.map(data => (
              <h6 className="queue_waite_time">
                {data.current_longest_queue_time.slice(0, 8)}
              </h6>
            ))
          : null}
      </div>
    );
  }
}

export default withFive9Data(Timer);
