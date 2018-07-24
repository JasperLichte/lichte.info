import React, { Component } from "react";
import './WeatherPanel.css';

class WeatherPanel extends Component {
  constructor() {
    super();
    this.state = {
      weather: {}
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          this.getWeather(latitude, longitude);
        },
        () => console.error("An Error accured getting your Geolocation..")
      );
    } else {
      console.error("No access to Geolocation..");
    }
  }

  getWeather = (lat, lon) => {
    const request = new XMLHttpRequest();
    const options = {
      units: "metric",
      lang: "de",
      appId: "32f1891e3db34ea30a0aca7ca8b6f212"
    };
    request.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${
        options.units
      }&lang=${options.lang}&APPID=${options.appId}`,
      true
    );
    request.onload = () => {
      const data = JSON.parse(request.responseText);
      if (data.cod === 200) {
        this.setState({
          weather: data
        });
      }
    };
    request.send();
  };

  getWeatherNodes = () => {
    const { main, name, weather } = this.state.weather;

    return (
      <div>
        <p className="name">{name}</p>
        <p className="temp">{main.temp_min + "° - " + main.temp_max + "°"}</p>
        <p className="description">{weather[0].description}</p>
        <img src={'http://openweathermap.org/img/w/' + weather[0].icon + '.png'} alt="" />
      </div>
    );
  };

  render = () => {
    return (
      <div className={this.state.weather.name ? "WeatherPanel active" : "WeatherPanel"}>
        {this.state.weather.name ? this.getWeatherNodes() : null}
      </div>
    );
  };
}

export default WeatherPanel;