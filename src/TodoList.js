import React, { Component } from 'react'
import Todo from './Todo'
import TodoInput from './TodoInput'

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        todos: [
            {name: 'one', key: 1},
            {name: 'two', key: 2},
            {name: 'three', key: 3}
        ],
        textInput: ''
    }
  }

  addTodo() {
    
  }

  setInputValue(value) {
    this.setState({textInput: value})
  }

  render() {      
    return (
      <div className="todo_list">
        <div> Num todos: {this.state.todos.length} </div>
        { this.state.todos.map(item =>
            <Todo 
                key={item.key} 
                name={item.name} 
            />
        )}
        <TodoInput />
      </div>
    )
  }
}