// @ts-check

import generate from "project-name-generator";
import Server from "../../components/Server/Server";

export function newServer(name) {
  return {
    name,
    app1: { name: null, appState: Server.appStateNames.none },
    app2: { name: null, appState: Server.appStateNames.none }
  };
}

export function destroyServerByName(servers, name) {
  const newServers = { ...servers };
  delete newServers[name];
  return newServers;
}

export function addServer(servers, server) {
  if (servers[server.name] !== undefined) {
    // debatable whether to put this side effect here - could return a status code and log elsewhere
    console.error(`The server with the name "${server.name}" already exists.`);
    return servers;
  }

  const newServers = { ...servers };
  newServers[server.name] = server;

  return newServers;
}

export function generateServerName() {
  return generate({ words: 2 }).dashed;
}

export function findLastServerName(servers) {
  const serversAsArr = Object.values(servers);

  // if there isn't at least one server this function will give you null
  if (serversAsArr.length < 1) return null;

  const { name: lastServerName } = serversAsArr[serversAsArr.length - 1];
  return lastServerName;
}

/**
 *
 * @param {import("../..").Servers} servers
 * @param {string} appName
 * @returns {{ servers: import("../..").Servers, server: import("../..").Server }}
 */
export function addApp(servers, appName) {
  const serversAsArr = Object.values(servers);

  let firstServerRunning0Apps = null;
  let firstServerRunning1App = null;
  for (let i = 0, len = serversAsArr.length; i < len; i++) {
    const currentServer = serversAsArr[i];
    const { app1, app2 } = currentServer;

    if (noApp(app1) && noApp(app2)) {
      firstServerRunning0Apps = currentServer;
      break;
    }
    // if firstServerRunning1App has not been set yet, and currentServer is a server running 1 app.
    if (firstServerRunning1App === null && yesApp(app1) && noApp(app2)) {
      firstServerRunning1App = currentServer;
    }
  }

  if (firstServerRunning0Apps) {
    firstServerRunning0Apps.app1 = {
      name: appName,
      appState: Server.appStateNames.init
    };
    return { servers, server: firstServerRunning0Apps };
  }

  if (firstServerRunning1App) {
    firstServerRunning1App.app2 = {
      name: appName,
      appState: Server.appStateNames.init
    };
    return { servers, server: firstServerRunning1App };
  }

  // it should be the case that:
  // firstServerRunning0Apps === null && firstServerRunning1App === null
  return { servers, server: null };
}

/**
 * Unexported functions:
 */

function noApp(app) {
  return app.appState === Server.appStateNames.none;
}

function yesApp(app) {
  return app.appState !== Server.appStateNames.none;
}
