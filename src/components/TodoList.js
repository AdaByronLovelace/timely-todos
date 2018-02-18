import React from 'react'
import Todo from './Todo'
import './Todo.css'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.state = { 
        todos: [
            {name: 'one', key: 1, tag: 'tag1'},
            {name: 'two', key: 2, desc: 'this is number two'},
            {name: 'three', key: 3, date: 'date'}
        ],
        nameInput: '',
        dateInput: '',
        tagInput: '',
        tags: [
          'tag 1',
          'tag 2',
          'tag 3'
        ]
    }
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  addTodo(event) {
    this.setState({ todos: [...this.state.todos, 
      {
        name: this.state.nameInput,
        key: this.state.todos.length + 1,
        tag: this.state.tagInput,
        deadlineDate: new Date(this.state.dateInput),
        createdDate: new Date()
      }
    ] })
    event.preventDefault()
  }

  handleNameChange(event) {
    this.setState({nameInput: event.target.value})
  }

  handleDateChange(event) {
    this.setState({dateInput: event.target.value})
  }

  handleTagChange(event) {
    this.setState({tagInput: event.target.value})
  }

  render() {   
    // const value = this.state.textInput   
    return (
      <div className="todoarea">
        <h2>todos</h2>
        <div> Num todos: {this.state.todos.length} </div>
        <div className="todolist">
          { this.state.todos.map(item =>
              <Todo 
                  key={item.key} 
                  name={item.name} 
                  tags={item.tags}
                  desc={item.desc}
                  duedate={item.date}
              />
          )}
        </div>
        <h2>add todo</h2>
        <div>Value: {this.state.nameInput}</div>
        <form onSubmit={this.addTodo}>
          <label>
            Name
            <input 
              name="name"
              type="text" 
              value={this.state.nameInput} 
              onChange={this.handleNameChange} 
            />
          </label>
          <label>
            Due Date
            <input 
              name="duedate"
              type="date" 
              value={this.state.dateInput} 
              onChange={this.handleDateChange}
            />
          </label>
          <label>
            Tag
            <input 
              name="tag"
              type="text" 
              value={this.state.tagInput} 
              onChange={this.handleTagChange} 
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}