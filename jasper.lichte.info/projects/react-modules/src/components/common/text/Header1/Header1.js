import React, { Component } from 'react';
import './Header1.css';

class Header1 extends Component {
  render() {
    console.log(this);
    return (
      <h1 className="Header1">{this.props.children}</h1>
    );
  }
}

export default Header1;
