export interface Application {
  name: string;
  appState: AppState;
}

export interface Server {
  name: string;
  app1: Application;
  app2: Application;
}

export type Servers = { [serverName: string]: Server };

export type AppState = "none" | "off" | "init" | "run";
