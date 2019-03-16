import React, { Component } from "react";
import "./Sidebar.css";

export default class Sidebar extends Component {
  render() {
    let sideHeight = window.innerHeight;
    return (
      <div className="sb-main" style={{ height: sideHeight }}>
        Yo
      </div>
    );
  }
}
