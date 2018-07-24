import React, { Component } from "react";
import WeatherPanel from "./components/WeatherPanel/WeatherPanel";
import NewsPanel from "./components/NewsPanel/NewsPanel";

class App extends Component {
  render() {
    return (
      <div>
        <WeatherPanel />
        <NewsPanel />
      </div>
    );
  }
}

export default App;
