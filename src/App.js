import React, { Component } from 'react';
import AppContainer from "./views/app-container.js";

class App extends Component {
  constructor(props) {
    super(props);
    //Set initial app state here
    this.state = {
      isLoaded: "True"
    }
  }
  
  render() {
    return (
      <div id="AppWrapper">
        <AppContainer loadState={this.state} />
      </div>
    );
  }
}

export default App;
