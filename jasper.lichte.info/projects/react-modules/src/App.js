import React, { Component } from 'react';
import './App.css';
import ToggleSwitch from './components/common/inputs/ToggleSwitch/ToggleSwitch';
import TextInput from './components/common/inputs/TextInput/TextInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToggleSwitch name="Switch" active="true" />
        <TextInput placeholder="huhuhu" />
      </div>
    );
  }
}

export default App;
