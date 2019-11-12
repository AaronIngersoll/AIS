import React, { Component } from "react";
import axios from "axios";

export default class Calls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: []
    };
  }

  componentDidMount() {
    this.getQueue();
    this.interval = setInterval(() => {
      this.getQueue();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getQueue() {
    var url = "https://aldermarketing.com/five9/queue";

    axios
      .get(url)
      .then(response => {
        const data = JSON.parse(response.data.body).filter(
          item => item.skill_name === "Inbound"
        );
        this.setState({
          data: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.data.map((data, i) => (
          <h1 key={i} className="calls_in_queue">
            {data.calls_in_queue}
          </h1>
        ))}
      </div>
    );
  }
}
