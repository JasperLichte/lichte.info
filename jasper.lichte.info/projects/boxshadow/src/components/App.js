import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputVals: {

      },
      shadowString: '0px 0px 5px rgba(0, 0, 0, 0.25)'
    };
  }

  render() {
    return (
      <div className="App">
        <div className="canvas">
          CSS 'box-shadow' property
        </div>
        <div className="inputs">
          <input type="range" id="x-offset" />
          <input type="range" id="y-offset" />
          <input type="range" id="x-offset" />
          <input type="range" id="x-offset" />
        </div>
      </div>
    );
  }
}

export default App;
