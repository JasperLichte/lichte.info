import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      'iss data': {}
    }
    this.makeRequest();
  }

  makeRequest = () => {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
      .then(res => res.json())
      .then(data => {
        this.setState({
          'iss data': data
        });
      });

      setTimeout(() => this.makeRequest(), 10000);
  }

  getDataNodes = () => {
    const { latitude, longitude, altitude, timestamp, velocity } = this.state['iss data'];

    return (
      <div className="data">
        <p>Lat: {latitude}</p>
        <p>Lon: {longitude}</p>
        <p>Alt: {altitude}</p>
        <p>Vel: {velocity}</p>
        <p>{timestamp}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <h2>Where is the ISS at?</h2>
        <div>
          {this.state['iss data'].name ? this.getDataNodes() : null}
        </div>
      </div>
    );
  }
}

export default App;
