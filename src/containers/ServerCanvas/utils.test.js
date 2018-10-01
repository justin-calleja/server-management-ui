// @ts-check

import { addApp, newServer } from "./utils";

/** @type {import("../..").Servers} */
const servers1 = {
  "agreeable-twist": newServer("agreeable-twist")
};

test("tmp test", () => {
  expect(addApp(servers1, "app A")).toEqual({
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
