import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      vals: {
        inset: false,
        offsetX: "20",
        offsetY: "10",
        blurRadius: "0",
        spreadRadius: "0",
        color: "#222"
      },
      shadowString: ""
    };
    this.state.shadowString =
      (this.state.vals.inset ? "inset " : "") +
      `${this.state.vals.offsetX}px ${this.state.vals.offsetY}px ${
        this.state.vals.blurRadius
      }px ${this.state.vals.spreadRadius}px ${this.state.vals.color}`;
  }

  updateVal = (key, newVal) => {
    this.state.vals[key] = newVal;
    this.state.shadowString =
      (this.state.vals.inset ? "inset " : "") +
      `${this.state.vals.offsetX}px ${this.state.vals.offsetY}px ${
        this.state.vals.blurRadius
      }px ${this.state.vals.spreadRadius}px ${this.state.vals.color}`;
    this.forceUpdate();
  };

  render() {
    return (
      <div className="App">
        <div
          className="canvas"
          style={{
            boxShadow: this.state.shadowString
          }}
        >
          CSS 'box-shadow' property
        </div>
        <div className="propertyString">
          <p>
            {this.state.shadowString
              ? "box-shadow: " + this.state.shadowString
              : null}
          </p>
        </div>
        <div className="inputs">
          <div>
            <span>Inset</span>
            <input
              type="checkbox"
              name="inset"
              onChange={e => {
                this.setState({
                  shadowString:
                    (e.target.checked ? "inset " : "") +
                    `${this.state.vals.offsetX}px ${
                      this.state.vals.offsetY
                    }px ${this.state.vals.blurRadius}px ${
                      this.state.vals.spreadRadius
                    }px ${this.state.vals.color}`
                });
              }}
            />
          </div>
          <div>
            <span>X-Offset</span>
            <input
              type="range"
              name="Param1"
              min="-50"
              max="50"
              value={this.state.vals.offsetX}
              onChange={e => {
                this.updateVal("offsetX", e.target.value);
              }}
            />
          </div>
          <div>
            <span>Y-Offset</span>
            <input
              type="range"
              id="y-offset"
              min="-50"
              max="50"
              value={this.state.vals.offsetY}
              onChange={e => {
                this.updateVal("offsetY", e.target.value);
              }}
            />
          </div>
          <div>
            <span>Blur-radius</span>
            <input
              type="range"
              id="x-offset"
              min="0"
              max="100"
              value={this.state.vals.blurRadius}
              onChange={e => {
                this.updateVal("blurRadius", e.target.value);
              }}
            />
          </div>
          <div>
            <span>Spreas-radius</span>
            <input
              type="range"
              id="x-offset"
              min="-100"
              max="100"
              value={this.state.vals.spreadRadius}
              onChange={e => {
                this.updateVal("spreadRadius", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
