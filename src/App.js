import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoList from './components/TodoList'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Timely To Dos</h1>
        </header>
        <TodoList />
      </div>
    )
  }
}
