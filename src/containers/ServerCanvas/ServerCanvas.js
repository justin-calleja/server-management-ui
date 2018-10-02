import React, { Component } from "react";
import PropTypes from "prop-types";
import Server from "../../components/Server/Server";
import ServerInfo from "../../components/ServerInfo/ServerInfo";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import {
  newServer,
  destroyServerByName,
  addServer,
  generateServerName,
  findLastServerName,
  addApp,
  removeApp
} from "./utils";
import "./ServerCanvas.css";

class ServerCanvas extends Component {
  constructor(props) {
    super(props);

    const { serverCount } = this.props;

    const servers = {};
    let serverName = null;
    for (let i = 0; i < serverCount; i++) {
      serverName = this.generateUniqueServerName();
      servers[serverName] = newServer(serverName);
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

  static propTypes = {
    serverCount: PropTypes.number,
    // The children prop is a function which receives the following callbacks (in an object):
    // { onAppAdd, onAppRemove }
    children: PropTypes.func
  };

  generateUniqueServerName = () => {
    // generateUniqueServerName is being used before setting the state for the first time in the constructor.
    if (!this.state) return generateServerName();

    let name = null;

    // Since I have no guarantee that "generateServerName()" will give me a unique name,
    // keep trying to generate a server name until you get one which is not already being used:
    do {
      name = generateServerName();
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
      const lastServerName = findLastServerName(servers);

      return lastServerName
        ? { servers: destroyServerByName(servers, lastServerName) }
        : // avoid changing state if there is no lastServerName (avoid re-render)
          null;
    });
  };

  onDestroyFocusedServer = () => {
    this.setState(({ servers, focusedServer }) => ({
      servers: destroyServerByName(servers, focusedServer.name)
    }));
    this.closeEditServerModal();
  };

  onAddServer = () => {
    this.setState(({ servers }) => ({
      servers: addServer(servers, newServer(this.generateUniqueServerName()))
    }));
  };

  onAppAdd = appName => {
    this.setState(({ servers }) => {
      const { servers: newServers, server } = addApp(servers, appName);
      // avoid re-render if state is not changed
      if (server === null) return null;
      return { servers: newServers };
    });
  };

  onAppRemove = appName => {
    this.setState(({ servers }) => {
      const { servers: newServers, server } = removeApp(servers, appName);
      // avoid re-render if state is not changed
      if (server === null) return null;
      return { servers: newServers };
    });
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
