import React, { Component } from "react";
import generate from "project-name-generator";
import Server from "../../components/Server/Server";
import ServerInfo from "../../components/ServerInfo/ServerInfo";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import "./ServerCanvas.css";

class ServerCanvas extends Component {
  constructor(props) {
    super(props);

    const { serverCount } = this.props;

    const servers = {};
    let serverName = null;
    for (let i = 0; i < serverCount; i++) {
      serverName = this.generateServerName();
      servers[serverName] = ServerCanvas.newServer({
        name: serverName
      });
    }

    this.state = {
      servers,
      editingServerMode: false,
      focusedServer: null
    };
  }

  static defaultProps = {
    serverCount: 4
  };

  static newServer(args) {
    return {
      ...args,
      app1: { name: null, appState: Server.appStateNames.none },
      app2: { name: null, appState: Server.appStateNames.none }
    };
  }

  static removeServerByName(servers, name) {
    const newServers = { ...servers };
    delete newServers[name];
    return newServers;
  }

  static addServer(servers, server) {
    if (servers[server.name] !== undefined) {
      console.error(
        `The server with the name "${server.name}" already exists.`
      );
      return servers;
    }

    const newServers = { ...servers };
    newServers[server.name] = server;

    return newServers;
  }

  generateServerName = () => {
    // generateServerName is being used before setting the state for the first time in the constructor.
    if (!this.state) return generate({ words: 2 }).dashed;

    let name = null;

    // keep trying to generate a server name until you get one which is not already being used:
    do {
      name = generate({ words: 2 }).dashed;
    } while (this.state.servers[name] !== undefined);

    return name;
  };

  closeEditServerModal = () => {
    this.setState({
      editingServerMode: false,
      focusedServer: null
    });
  };

  openEditServerModal = focusedServer => {
    this.setState({
      editingServerMode: true,
      focusedServer
    });
  };

  getServerElements = () => {
    const { servers } = this.state;
    return Object.values(servers).map(({ name, app1, app2 }) => (
      <Server
        key={name}
        name={name}
        app1={app1}
        app2={app2}
        onClick={this.openEditServerModal}
      />
    ));
  };

  onDestroyLastServer = () => {
    this.setState(({ servers }) => {
      const serversAsArr = Object.values(servers);
      if (serversAsArr.length < 1) return { servers };

      const { name: lastServerName } = serversAsArr[serversAsArr.length - 1];

      return {
        servers: ServerCanvas.removeServerByName(servers, lastServerName)
      };
    });
  };

  onDestroyFocusedServer = () => {
    this.setState(({ servers, focusedServer }) => ({
      servers: ServerCanvas.removeServerByName(servers, focusedServer.name)
    }));
    this.closeEditServerModal();
  };

  onAddServer = () => {
    this.setState(({ servers }) => ({
      servers: ServerCanvas.addServer(
        servers,
        ServerCanvas.newServer({ name: this.generateServerName() })
      )
    }));
  };

  onAppAdd = arg => {
    console.log("in onAppAdd", arg);
  };

  onAppRemove = arg => {
    console.log("in onAppRemove", arg);
  };

  render() {
    const { children } = this.props;
    const serverElements = this.getServerElements();

    return (
      <React.Fragment>
        <Modal
          show={this.state.editingServerMode}
          onBackdropClick={this.closeEditServerModal}
        >
          {this.state.focusedServer ? (
            <ServerInfo
              {...this.state.focusedServer}
              onDestroy={this.onDestroyFocusedServer}
              onCancel={this.closeEditServerModal}
            />
          ) : null}
        </Modal>
        <div className="ServerCanvas">
          <h1 className="ServerCanvas-title">Server Canvas</h1>
          <div className="ServerCanvas-server-container">{serverElements}</div>
          <div className="ServerCanvas-controls">
            <Button className="destroy" onClick={this.onDestroyLastServer}>
              Destroy
            </Button>
            <Button className="add" onClick={this.onAddServer}>
              Add Server
            </Button>
          </div>
        </div>
        {children({
          onAppAdd: this.onAppAdd,
          onAppRemove: this.onAppRemove
        })}
      </React.Fragment>
    );
  }
}

export default ServerCanvas;
