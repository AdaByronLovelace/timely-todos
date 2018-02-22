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
    this.removeTodo = this.removeTodo.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.getTemperature = this.getTemperature.bind(this)

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
    let data = localStorage.getItem(this.state.localStore)
    if (data !== null) {
      this.setState({todos:  Object.values(JSON.parse(data))})
    }
  }

  setData() {
    let dataStr = JSON.stringify(this.state.todos) 
    localStorage.setItem(this.state.localStore, dataStr)
  }

  getTemperature(created) {
    const now = new Date()
    const create = new Date(created)
    let timeDiff = Math.abs(now.getTime() - create.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  addTodo(event) {
    let id = 0 
    let last = this.state.todos.length - 1
    if (last > 0) {
      id = this.state.todos[last].id + 1
    }
    let newTodo = {
      name: this.state.nameInput,
      id: id,
      tag: this.state.tagInput,
      deadlineDate: new Date(this.state.dateInput),
      createdDate: new Date(),
      done: false
    }
    let newTodos = this.state.todos
    newTodos.push(newTodo)
    this.setState(newTodos)
    this.setData()
    event.preventDefault()
  }

  removeTodo(id) {
    let newTodos = this.state.todos.filter((todo) => {
      return todo.id !== id
    })
    this.setState({todos: newTodos})
    this.setData()
  }

  handleDone(id) {
    let newTodo = {}
    // eslint-disable-next-line
    let newTodos = this.state.todos.filter((todo) => {
      if (todo.id === id) {
        newTodo = {
          name: todo.name,
          id: todo.id,
          tag: todo.tag,
          deadlineDate: todo.deadlineDate,
          createdDate: todo.createdDate,
          done: !todo.done
        }
      } else {
        return todo
      }
    })
    newTodos.push(newTodo)
    this.setState({todos: newTodos})
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
                  key={item.id} 
                  id={item.id}
                  name={item.name} 
                  tags={item.tags}
                  desc={item.desc}
                  duedate={item.date}
                  onDelete={this.removeTodo}
                  done={item.done}
                  onDone={this.handleDone}
                  temp={this.getTemperature(item.createdDate)}
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