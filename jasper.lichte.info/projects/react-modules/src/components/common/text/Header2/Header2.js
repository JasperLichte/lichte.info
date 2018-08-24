import React, { Component } from 'react';
import './Header2.css';
class Header2 extends Component {
  render = () => (
      <h2 className="Header2">{this.props.children}</h2>
  );
}

export default Header2;
