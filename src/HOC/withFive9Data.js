import React, { Component } from "react";
import axios from "axios";

class IntervalRunner {
  queueData = null;
  dataSixtyMin = null;
  IBdata = null;
  constructor() {
    console.log("constructed");
    this.interval = setInterval(this.runner, 1000);
  }
  runner = () => {
    this.getQueue();
    this.getQueue60();
    this.getIBCampStats();
  };

  getQueue = () => {
    var url = "https://aldermarketing.com/five9/queue";

    axios
      .get(url)
      .then((response) => {
        const queueData = JSON.parse(response.data.body).filter(
          (item) => item.skill_name === "Inbound"
        );
        this.queueData = queueData;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getQueue60 = () => {
    var url = "https://aldermarketing.com/five9/longest-queue-hour";

    axios
      .get(url)
      .then((response) => {
        const dataSixtyMin = response.data;
        this.dataSixtyMin = dataSixtyMin;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getIBCampStats = () => {
    var url = "https://aldermarketing.com/five9/inbound-campaign-status";

    axios
      .get(url)
      .then((response) => {
        const IBdata = (response.data).filter(
          (item) => item.campaign_name.substring(0,3) === "AIS"
        );
        this.IBdata = IBdata;
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

var interval = new IntervalRunner();

// This function takes a component...
export default function withFive9Data(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    state = {
      queueData: null,
      dataSixtyMin: null,
      IBdata: null,
    };
    componentDidMount() {
      
      this.interval = setInterval(() => {
      this.setState({
        queueData: interval.queueData,
        dataSixtyMin: interval.dataSixtyMin,
        IBdata: interval.IBdata,
      });
      // console.log(this.state)
      }, 200);
     
    }

    componentWillUnmount() {

      clearInterval(this.interval);
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          queue_data={this.state.queueData}
          data_sixty_min={this.state.dataSixtyMin}
          IB_data={this.state.IBdata}
          {...this.props}
        />
      );
    }
  };
}
