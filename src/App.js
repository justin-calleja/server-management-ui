import React, { Component } from "react";
import ServerCanvas from "./containers/ServerCanvas/ServerCanvas";
import Application from "./components/Application/Application";
import "./App.css";

class App extends Component {
  // state = {
  //   editingServerMode: false,
  //   server: null
  // };

  render() {
    return (
      <React.Fragment>
        <ServerCanvas onServerClick={this.openEditServerModal} />

        <div className="App-container">
          <Application name="App A" />
          <Application name="App B" />
          <Application name="App C" />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
