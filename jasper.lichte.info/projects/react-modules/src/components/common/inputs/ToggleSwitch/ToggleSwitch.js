import React, { Component } from "react";
import "./ToggleSwitch.css";

class ToggleSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      active: this.props.active == "true" || this.props.active == 1 ? true : false
    };
  }

  toggle = () => {
    let active = !this.state.active;
    this.setState({
      active: active
    });
  };

  render() {
    return (
      <div
        className={"ToggleSwitch" + (this.state.active ? " active" : "")}
        onClick={this.toggle}
      >
        <div className="slider" />
      </div>
    );
  }
}

export default ToggleSwitch;
