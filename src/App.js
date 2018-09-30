import React, { Component } from "react";
import ServerCanvas from "./containers/ServerCanvas/ServerCanvas";
// import Modal from "./components/Modal/Modal";
// import ServerInfo from "./components/ServerInfo/ServerInfo";
import "./App.css";

class App extends Component {
  // state = {
  //   editingServerMode: false,
  //   server: null
  // };

  render() {
    return (
      <React.Fragment>
        {/* <Modal
          show={this.state.editingServerMode}
          onBackdropClick={this.closeEditServerModal}
        >
          {this.state.server ? <ServerInfo {...this.state.server} /> : null}
        </Modal> */}
        <ServerCanvas onServerClick={this.openEditServerModal} />

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </React.Fragment>
    );
  }
}

export default App;
