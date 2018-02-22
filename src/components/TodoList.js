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
    this.compareTemps = this.compareTemps.bind(this)
    this.updateTodos = this.updateTodos.bind(this)
    this.getNextId = this.getNextId.bind(this)

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

  // Lifecycle Events

  componentDidMount() {
    this.getData()
  }

  // Local Storage 

  getData() {
    let data = localStorage.getItem(this.state.localStore)
    if (data !== null) {
      this.updateTodos(Object.values(JSON.parse(data)), false)
    }
  }

  setData() {
    let dataStr = JSON.stringify(this.state.todos) 
    localStorage.setItem(this.state.localStore, dataStr)
  }

  // Todos Add, Change, Delete

  addTodo(event) {
    event.preventDefault()
    let newTodo = {
      name: this.state.nameInput,
      id: this.getNextId(),
      tag: this.state.tagInput,
      deadlineDate: new Date(this.state.dateInput),
      createdDate: new Date(),
      done: false
    }
    let newTodos = this.state.todos
    newTodos.push(newTodo)
    this.updateTodos(newTodos)
  }

  removeTodo(id) {
    let newTodos = this.state.todos.filter((todo) => {
      return todo.id !== id
    })
    this.updateTodos(newTodos)
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
    this.updateTodos(newTodos)
  }

  updateTodos(newTodos, set) {
    this.setState({todos: newTodos}, () =>
      this.setData()
    )
  }

  // Helper Functions

  getTemperature(created) {
    const now = new Date()
    const create = new Date(created)
    let timeDiff = Math.abs(now.getTime() - create.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24));
  }

  compareTemps(a,b) {
    let aTemp = this.getTemperature(a.deadlineDate)
    let bTemp = this.getTemperature(b.deadlineDate)

    if ((a.done && b.done) || (!a.done && !b.done)) {
      if (aTemp < bTemp) return -1
      else if (bTemp < aTemp) return 1
      else return 0
    } 
    else if (a.done) return 1
    else return -1
  }

  getNextId() {
    var next = 0
    // eslint-disable-next-line 
    while (this.state.todos.filter(e => e.id === next).length > 0) {
      next = Math.floor(Math.random()*10000)
    }
    return next
  }

  // Input changes (TODO: Get rid of)

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
          { [].concat(this.state.todos)
            .sort(this.compareTemps)
            .map(item =>
              <Todo 
                  key={item.id} 
                  id={item.id}
                  name={item.name} 
                  tag={item.tag}
                  deadlineDate={item.deadlineDate.toString()}
                  createdDate={item.createdDate.toString()}
                  done={item.done}
                  temp={this.getTemperature(item.deadlineDate)}
                  onDone={this.handleDone}
                  onDelete={this.removeTodo}
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