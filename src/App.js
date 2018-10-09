import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import FrontPage from './containers/frontPage'
import SettingsPage from './containers/settingsPage'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Route exact path="/" component={FrontPage}/>
          <Route path="/settings" key="settings" component={SettingsPage} />
      </div>
    );
  }
}

export default App;
