import React, { Component } from 'react';
import Crypto from './Crypto';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Crypto Rate
          </p>
        </header>
        <Crypto />
      </div>
    );
  }
}

export default App;
