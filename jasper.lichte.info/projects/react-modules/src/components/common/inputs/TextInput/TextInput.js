import React, { Component } from "react";
import "./TextInput.css";

class TextInput extends Component {
  render = () => <input 
                className="TextInput"
                type="text" 
                placeholder={this.props.placeholder}
                name={this.props.name}
                value={this.props.value}
                />;
}

export default TextInput;
