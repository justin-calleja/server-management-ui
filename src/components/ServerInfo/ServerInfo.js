import React from "react";

const ServerInfo = ({ name, app1, app2, onDestroy }) => {
  return (
    <div className="ServerInfo">
      <div>{name}</div>
      <button onClick={onDestroy}>Destroy</button>
    </div>
  );
};

export default ServerInfo;
