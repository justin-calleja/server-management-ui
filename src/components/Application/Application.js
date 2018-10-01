import React from "react";
import "./Application.css";

const Application = ({ name }) => (
  <div className="Application">
    <button className="Application-add">+</button>
    <button className="Application-remove">-</button>
    <div className="Application-name">{name}</div>
  </div>
);

export default Application;
