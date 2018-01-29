import React, { Component } from 'react'
// import './Todo.css'

export default class Todo extends Component {
  render() {
    return (
      <h2 className="todo_item">
        { this.props.name }
      </h2>
    )
  }
}
