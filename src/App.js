import React, { Component } from "react";
import ServerCanvas from "./containers/ServerCanvas/ServerCanvas";
import Application from "./components/Application/Application";
import "./App.css";

// It happens that App could be just a functional component in this e.g. app but I'd rather keep it class based in case any app-level state
// needs to kept "later on".
class App extends Component {
  render() {
    return (
      <ServerCanvas serverCount={4}>
        {({ onAppAdd, onAppRemove }) => (
          <React.Fragment>
            <Application
              name="App A"
              onAppAdd={onAppAdd}
              onAppRemove={onAppRemove}
            />
            <Application
              name="App B"
              onAppAdd={onAppAdd}
              onAppRemove={onAppRemove}
            />
            <Application
              name="App C"
              onAppAdd={onAppAdd}
              onAppRemove={onAppRemove}
            />
          </React.Fragment>
        )}
      </ServerCanvas>
    );
  }
}

export default App;
