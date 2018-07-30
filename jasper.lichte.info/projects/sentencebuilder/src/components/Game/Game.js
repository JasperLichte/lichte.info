import React, { Component } from "react";
import './Game.css';

class Game extends Component {
  getColorByChar(c) {
    c = c.toLowerCase().charCodeAt(0);
    var i = c * 26 + 100;
    var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
    var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
    var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  render() {
    return (
      <div
        className="Game"
        style={{
          backgroundColor: this.getColorByChar(this.props.letter)
        }}
      >
        <div className="task-screen">
          <span>
            {this.props.letter}
          </span>
          <p>{this.props.category}</p>
        </div>
        <div className="input">
          <input type="text" />
          <button></button>
        </div>
      </div>
    );
  }
}

export default Game;
