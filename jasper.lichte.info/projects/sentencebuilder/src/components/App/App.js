import React, { Component } from 'react';
import Game from './../Game/Game';
import './App.css';

class App extends Component {

  getRandomLetter() {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return possible.charAt(Math.floor(Math.random() * possible.length));
  }

  render() {
    return (
      <div className="App">
        <Game category="Animal" letter={this.getRandomLetter()} />
      </div>
    );
  }
}

export default App;