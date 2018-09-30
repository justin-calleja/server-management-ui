import React from "react";
import PropTypes from "prop-types";
import "./Server.css";

const Server = ({ name, app1, app2, onClick }) => {
  return (
    <div
      className="Server"
      onClick={event => onClick({ name, app1, app2 }, event)}
    >
      <svg
        className="Server-img"
        width="128px"
        height="123px"
        display="block"
        viewBox="0 0 128 123"
        version="1.1"
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Group">
            {Server.app1RunCircle(app1.state)}
            {Server.app1InitCircle(app1.state)}
            {Server.app1OffCircle(app1.state)}
            {Server.app2RunCircle(app2.state)}
            {Server.app2InitCircle(app2.state)}
            {Server.app2OffCircle(app2.state)}
            <path
              d="M112.66791,0 L15.3339105,0 C11.1209105,0 7.28091047,1.733 4.50691047,4.507 C1.73391047,7.28 0.000910469039,11.12 0.000910469039,15.333 C0.000910469039,23.76 6.90791047,30.666 15.3339105,30.666 L112.66691,30.666 C116.87991,30.666 120.71991,28.933 123.49391,26.159 C126.26791,23.386 128.00091,19.546 128.00091,15.333 C128.00091,6.906 121.09391,0 112.66791,0 Z M81.3339105,19.333 C79.1209105,19.333 77.3339105,17.546 77.3339105,15.333 C77.3339105,13.12 79.1209105,11.333 81.3339105,11.333 C83.5469105,11.333 85.3339105,13.12 85.3339105,15.333 C85.3339105,17.546 83.5479105,19.333 81.3339105,19.333 Z M97.3339105,19.333 C95.1209105,19.333 93.3339105,17.546 93.3339105,15.333 C93.3339105,13.12 95.1209105,11.333 97.3339105,11.333 C99.5469105,11.333 101.33391,13.12 101.33391,15.333 C101.33391,17.546 99.5479105,19.333 97.3339105,19.333 Z M113.33391,21.333 C110.02691,21.333 107.33391,18.64 107.33391,15.333 C107.33391,12.026 110.02691,9.333 113.33391,9.333 C116.64091,9.333 119.33391,12.026 119.33391,15.333 C119.33391,18.64 116.64091,21.333 113.33391,21.333 Z M69.3339105,94.693 L69.3339105,68 L112.66691,68 C116.87991,68 120.71991,66.267 123.49391,63.493 C126.84091,60.145 128.67391,55.244 127.77191,50.008 C126.48991,42.564 119.67691,37.333 112.12291,37.333 L15.3339105,37.333 C11.1209105,37.333 7.28091047,39.066 4.50691047,41.84 C1.15991047,45.187 -0.673089531,50.088 0.228910469,55.324 C1.51091047,62.768 8.32291047,68 15.8769105,68 L58.6669105,68 L58.6669105,94.693 C55.0399105,96.133 52.1339105,99.04 50.6939105,102.666 L5.33391047,102.666 C2.38791047,102.666 0.000910469039,105.054 0.000910469039,107.999 C0.000910469039,110.945 2.38891047,113.332 5.33391047,113.332 L50.6939105,113.332 C52.8009105,118.612 57.9739105,122.345 64.0009105,122.345 C70.0279105,122.345 75.2009105,118.612 77.3079105,113.332 L122.66791,113.332 C125.61391,113.332 128.00091,110.944 128.00091,107.999 C128.00091,105.053 125.61291,102.666 122.66791,102.666 L77.3079105,102.666 C75.8679105,99.04 72.9609105,96.133 69.3339105,94.693 Z M113.33391,46.666 C116.64091,46.666 119.33391,49.359 119.33391,52.666 C119.33391,55.973 116.64091,58.666 113.33391,58.666 C110.02691,58.666 107.33391,55.973 107.33391,52.666 C107.33391,49.359 110.02791,46.666 113.33391,46.666 Z M97.3339105,48.666 C99.5469105,48.666 101.33391,50.453 101.33391,52.666 C101.33391,54.879 99.5469105,56.666 97.3339105,56.666 C95.1209105,56.666 93.3339105,54.879 93.3339105,52.666 C93.3339105,50.453 95.1209105,48.666 97.3339105,48.666 Z M81.3339105,48.666 C83.5469105,48.666 85.3339105,50.453 85.3339105,52.666 C85.3339105,54.879 83.5469105,56.666 81.3339105,56.666 C79.1209105,56.666 77.3339105,54.879 77.3339105,52.666 C77.3339105,50.453 79.1209105,48.666 81.3339105,48.666 Z"
              fill="#231F20"
              fillRule="nonzero"
            />
          </g>
        </g>
      </svg>
      <div className="Server-name">{name}</div>
    </div>
  );
};

Server.appStateNames = {
  none: "none",
  off: "off",
  init: "init",
  run: "run"
};

const appStatePropType = PropTypes.oneOf(Object.values(Server.appStateNames));

Server.propTypes = {
  app1State: appStatePropType,
  app2State: appStatePropType
};

Server.defaultProps = {
  app1State: "none",
  app2State: "none"
};

Server.colors = {
  none: "#FFFFFF",
  off: "#FF0000",
  init: "#F5A623",
  run: "#7ED321"
};

Server.app1OffCircle = appState => {
  const { none, off } = Server.colors;
  const fill = ["off", "init", "run"].includes(appState) ? off : none;
  return <circle fill={fill} cx="78" cy="52" r="8" />;
};

Server.app1InitCircle = appState => {
  const { none, init } = Server.colors;
  const fill = ["init", "run"].includes(appState) ? init : none;
  return <circle fill={fill} cx="97" cy="52" r="8" />;
};

Server.app1RunCircle = appState => {
  const { none, run } = Server.colors;
  const fill = appState === "run" ? run : none;
  return <circle fill={fill} cx="115" cy="52" r="8" />;
};

Server.app2OffCircle = appState => {
  const { none, off } = Server.colors;
  const fill = ["off", "init", "run"].includes(appState) ? off : none;
  return <circle fill={fill} cx="78" cy="15" r="8" />;
};

Server.app2InitCircle = appState => {
  const { none, init } = Server.colors;
  const fill = ["init", "run"].includes(appState) ? init : none;
  return <circle fill={fill} cx="97" cy="15" r="8" />;
};

Server.app2RunCircle = appState => {
  const { none, run } = Server.colors;
  const fill = appState === "run" ? run : none;
  return <circle fill={fill} cx="115" cy="15" r="8" />;
};

export default Server;
