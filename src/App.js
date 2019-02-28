import React, { Component } from 'react'
import './App.css'
import Timeline from './components/Timeline'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Aion - Author Timeline Tool</h1>
        </header>
        <Timeline />
      </div>
    )
  }
}
