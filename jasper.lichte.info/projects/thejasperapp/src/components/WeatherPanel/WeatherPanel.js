import React, { Component } from "react";

class WeatherPanel extends Component {
  constructor() {
    super();
    this.state = {
        deg : 21
    };
  }
  render() {
    return (
      <div className="WeatherPanel">
        <p>{this.state.deg}</p>
        <button onClick={this.refreshWeather}>Refresh</button>
      </div>
    );
  }
  refreshWeather = () => {
      this.setState({
          deg: this.state.deg + 1
      });
  }
}

export default WeatherPanel;
