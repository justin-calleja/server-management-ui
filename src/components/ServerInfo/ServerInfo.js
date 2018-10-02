import React from "react";
import Button from "../Button/Button";
import { noApp } from "../../containers/ServerCanvas/utils";
import "./ServerInfo.css";

const ServerInfo = ({ name, app1, app2, onDestroy, onCancel }) => {
  return (
    <div className="ServerInfo">
      <div className="ServerInfo-content">
        <span className="ServerInfo-name">{name}</span>
        {noApp(app1) ? null : (
          <React.Fragment>
            <span>… is running:</span>
            <div className="ServerInfo-app-info">
              <span className="ServerInfo-app-name">{app1.name}</span>{" "}
              <span>status: {app1.appState}</span>
            </div>
            {noApp(app2) ? null : (
              <div className="ServerInfo-app-info">
                <span className="ServerInfo-app-name">{app2.name}</span>{" "}
                <span>status: {app2.appState}</span>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
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
