import React from "react";
import Button from "../Button/Button";
import "./ServerInfo.css";

const ServerInfo = ({ name, app1, app2, onDestroy, onCancel }) => {
  return (
    <div className="ServerInfo">
      <div className="ServerInfo-name">{name}</div>
      <Button className="cancel" onClick={onCancel}>
        Cancel
      </Button>
      <Button className="destroy" onClick={onDestroy}>
        Destory
      </Button>
    </div>
  );
};

export default ServerInfo;
