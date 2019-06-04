import React, { Component } from "react";
import axios from "axios";

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      showComponent: false
    };
    this.componentShow = this.componentShow.bind(this);
  }

  componentDidMount() {
    this.getQueue();
    this.componentShow();
    this.interval = setInterval(() => {
      this.getQueue();
      this.componentShow();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getQueue() {
    var url = "https://aldermarketing.com/five9/queue";

    axios
      .get(url)
      .then(response => {
        this.setState({
          data: response.data.filter(item => item.skill_name === "Inbound")
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentShow() {
    this.setState({
      showComponent:
        this.state.data.map(data => data.calls_in_queue) > 0 ? true : false
    });
  }

  render() {
    return (
      <div>
        {this.state.showComponent
          ? this.state.data.map(data => (
              <h6 className="queue_waite_time">
                {data.current_longest_queue_time.slice(0, 8)}
              </h6>
            ))
          : null}
      </div>
    );
  }
}
