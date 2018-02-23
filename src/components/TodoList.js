import React from 'react'
import Todo from './Todo'
import './Todo.css'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.getTemperature = this.getTemperature.bind(this)
    this.compareTemps = this.compareTemps.bind(this)
    this.updateTodos = this.updateTodos.bind(this)
    this.getNextId = this.getNextId.bind(this)
    this.addTag = this.addTag.bind(this)

    this.state = {
        localStore: 'timelytodos', 
        todos: [],
        tags: [
          'general'
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
    if (data != null) {
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
      name: event.target[0].value,
      id: this.getNextId(),
      tag: event.target[2].value,
      deadlineDate: new Date(event.target[3].value),
      createdDate: new Date(),
      done: false
    }
    this.addTag(event.target[2].value)
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

  // Tags/Categories

  addTag(newTag) {
    if (! this.state.tags.findIndex((e)=>e===newTag)) {
      this.setState({tags: [newTag].concat(this.state.todos)})
    }
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
          <form className="todo open" onSubmit={this.addTodo}>
            <div className="top">
              <span className="checkbox-container">
                <span className="checkmark"></span>
              </span>
              <input 
                name="name"
                type="text" 
              />
              <button type="submit" value="Submit">
                Add
              </button>
            </div>
            <div className="bottom">
              <div className="tag"> 
                <label>Category: </label>
                <input type="text" className="tag" list="tags" />
                <datalist id="tags">
                  { this.state.tags.map((tag) =>
                    <option value={tag} key={tag} />
                  )}
                </datalist>
              </div>
              <div className="due">
                <label>Due Date: </label>
                <input 
                  name="duedate"
                  type="date" 
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}