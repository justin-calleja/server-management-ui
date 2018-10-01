import React from "react";
import "./Application.css";

const Application = ({ name, onAppAdd, onAppRemove }) => (
  <div className="Application">
    <button className="Application-add" onClick={e => onAppAdd(name, e)}>
      +
    </button>
    <button className="Application-remove" onClick={e => onAppRemove(name, e)}>
      -
    </button>
    <div className="Application-name">{name}</div>
  </div>
);

export default Application;
