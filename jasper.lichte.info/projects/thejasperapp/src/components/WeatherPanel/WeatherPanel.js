import React, { Component } from "react";

class WeatherPanel extends Component {
  constructor() {
    super();
    this.state = {
        weather : {
          deg : 21
        }
    };
  }
  render() {
    return (
      <div className="WeatherPanel">
        <p>{this.state.weather.deg}</p>
        <button onClick={this.refreshWeather}>Refresh</button>
      </div>
    );
  }
  refreshWeather = () => {
      this.setState({
        weather : {
          deg: this.state.weather.deg + 1
        }
      });
  }
}

export default WeatherPanel;
