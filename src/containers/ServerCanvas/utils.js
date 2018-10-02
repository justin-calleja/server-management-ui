// @ts-check

import generate from "project-name-generator";
// Typescript definitions for moment are not recognizing the default export from the moment package:
// @ts-ignore
import moment from "moment";
import Server from "../../components/Server/Server";

export function nullApp() {
  return { name: null, appState: Server.appStateNames.none };
}

export function newServer(name) {
  return {
    name,
    app1: nullApp(),
    app2: nullApp()
  };
}

export function destroyServerByName(servers, name) {
  const newServers = { ...servers };
  const destroyedServer = newServers[name];
  delete newServers[name];
  return { servers: newServers, destroyedServer };
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
 * Returns given Servers with app added appropriately (if eligible) and server pointing to the Server running the app (or null for server if
 * app could not be started), and app for the started app (or null if the app could not be started).
 * @param {import("../..").Servers} servers
 * @param {string} appName
 * @returns {{ servers: import("../..").Servers, server: import("../..").Server, app: import("../..").Application }}
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
    const app = {
      name: appName,
      appState: Server.appStateNames.init,
      startedAt: moment()
    };
    firstServerRunning0Apps.app1 = app;
    return { servers, server: firstServerRunning0Apps, app };
  }

  if (firstServerRunning1App) {
    const app = {
      name: appName,
      appState: Server.appStateNames.init,
      startedAt: moment()
    };
    firstServerRunning1App.app2 = app;
    return { servers, server: firstServerRunning1App, app };
  }

  // it should be the case that:
  // firstServerRunning0Apps === null && firstServerRunning1App === null
  return { servers, server: null, app: null };
}

/**
 * @param {import("../..").Servers} servers
 * @param {string} appName
 * @returns {{ servers: import("../..").Servers, server: import("../..").Server }}
 */
export function removeApp(servers, appName) {
  let lastServerRunningApp = findLastServerRunningApp(servers, appName);

  // if a server running the app was found:
  if (lastServerRunningApp) {
    // if both the server's app have the same appName
    if (
      appHasName(lastServerRunningApp.app1, appName) &&
      appHasName(lastServerRunningApp.app2, appName)
    ) {
      nullifyLatestApp(lastServerRunningApp);
    } else if (appHasName(lastServerRunningApp.app1, appName)) {
      lastServerRunningApp.app1 = nullApp();
    } else if (appHasName(lastServerRunningApp.app2, appName)) {
      lastServerRunningApp.app2 = nullApp();
    }

    return { servers, server: lastServerRunningApp };
  }

  return { servers, server: null };
}

export function getRunningAppNames(server) {
  const runningAppNames = [];
  if (yesApp(server.app1)) runningAppNames.push(server.app1.name);
  if (yesApp(server.app2)) runningAppNames.push(server.app2.name);
  return runningAppNames;
}

/**
 *
 * @param {import("../..").Application} app
 */
export function noApp(app) {
  return app.appState === Server.appStateNames.none;
}

/**
 *
 * @param {import("../..").Application} app
 */
export function yesApp(app) {
  return app.appState !== Server.appStateNames.none;
}

/**
 *
 * @param {import("../..").Application} app
 */
export function appHasName(app, name) {
  return app.name === name;
}

export const random = from => to =>
  Math.floor(Math.random() * (to - from) + from);

/**
 * This function mutates the given server.
 *
 * @param {import('../..').Server} server
 * @param {import('../..').Application} app
 */
export function runApp(server, app) {
  if (server.app1 === app) {
    server.app1.appState = Server.appStateNames.run;
  } else if (server.app2 === app) {
    server.app2.appState = Server.appStateNames.run;
  }
}

/**
 * Private functions
 */

/**
 *
 * @param {import("../..").Servers} servers
 * @param {string} appName
 */
function findLastServerRunningApp(servers, appName) {
  const serversAsArr = Object.values(servers);

  let lastServerRunningApp = null;
  for (let i = 0, len = serversAsArr.length; i < len; i++) {
    const currentServer = serversAsArr[i];
    const { app1, app2 } = currentServer;

    if (appHasName(app1, appName) || appHasName(app2, appName)) {
      lastServerRunningApp = currentServer;
    }
  }

  return lastServerRunningApp;
}

/**
 * This function mutates the given server.
 *
 * @param {import('../..').Server} server
 */
function nullifyLatestApp(server) {
  if (server.app1.startedAt < server.app2.startedAt) {
    server.app2 = nullApp();
  } else {
    server.app1 = nullApp();
  }
}
