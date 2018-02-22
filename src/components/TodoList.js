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
        localStore: 'timelytodos', 
        todos: [],
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

  componentDidMount() {
    this.getData()
  }

  getData() {
    let data = Object.values(JSON.parse(localStorage.getItem(this.state.localStore)))
    if (typeof data !== undefined) {
      this.setState({todos: data})
    }
  }

  setData() {
    let dataStr = JSON.stringify(this.state.todos) 
    localStorage.setItem(this.state.localStore, dataStr)
  }

  addTodo(event) {
    let newTodo = {
      name: this.state.nameInput,
      key: this.state.todos.length + 1,
      tag: this.state.tagInput,
      deadlineDate: new Date(this.state.dateInput),
      createdDate: new Date()
    }
    let newTodos = this.state.todos
    newTodos.push(newTodo)
    this.setState(newTodos)
    this.setData()
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