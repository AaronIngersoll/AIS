import React, { Component } from "react";
import axios from "axios";

class IntervalRunner {
  data = null;
  constructor() {
    console.log("constructed");
    this.interval = setInterval(this.getQueue, 1000);
  }
  getQueue = () => {
    var url = "https://aldermarketing.com/five9/queue";

    axios
      .get(url)
      .then(response => {
        const data = JSON.parse(response.data.body).filter(
          item => item.skill_name === "Inbound"
        );
        this.data = data;
      })
      .catch(error => {
        console.error(error);
      });
  };
}

var interval = new IntervalRunner();

// This function takes a component...
export default function withFive9Data(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    state = { data: null };
    componentDidMount() {
      this.interval = setInterval(() => {
        this.setState({ data: interval.data });
      }, 200);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
