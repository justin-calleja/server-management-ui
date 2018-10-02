// @ts-check

import { addApp, newServer, destroyServerByName } from "./utils";

/** @type {import("../..").Servers} */
const servers1 = {
  "agreeable-twist": newServer("agreeable-twist")
};

const servers2 = {
  "agreeable-twist": newServer("agreeable-twist"),
  "red-zebra": newServer("red-zebra"),
  "ready-noise": newServer("ready-noise"),
  "furry-hot": newServer("furry-hot")
};

test("tmp test", () => {
  expect(addApp(servers1, "app A")).toMatchObject({
    servers: {
      "agreeable-twist": {
        name: "agreeable-twist",
        app1: { name: "app A", appState: "init" },
        app2: { name: null, appState: "none" }
      }
    },
    server: {
      name: "agreeable-twist",
      app1: { name: "app A", appState: "init" },
      app2: { name: null, appState: "none" }
    }
  });
});

test("destroyServerByName", () => {
  expect(destroyServerByName(servers2, "red-zebra")).toEqual({
    servers: {
      "agreeable-twist": newServer("agreeable-twist"),
      "ready-noise": newServer("ready-noise"),
      "furry-hot": newServer("furry-hot")
    },
    destroyedServer: newServer("red-zebra")
  });
});
