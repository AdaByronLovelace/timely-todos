import React from 'react'
import Todo from './Todo'
import './Todo.css'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.addTodo = this.addTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.compareTemps = this.compareTemps.bind(this)
    this.updateTodos = this.updateTodos.bind(this)
    this.updateTags = this.updateTags.bind(this)
    this.getNextId = this.getNextId.bind(this)
    this.addTag = this.addTag.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
    this.sortTags = this.sortTags.bind(this)
    this.resetTodos = this.resetTodos.bind(this)
    this.clearData = this.clearData.bind(this)
    this.copyData = this.copyData.bind(this)

    this.state = {
      localTodos: 'timelytodos',
      todos: [],
      tags: [],
      filter: 'all'
    }
  }

  // Lifecycle Events

  componentDidMount() {
    this.getData()
  }

  // Local Storage 

  getData() {
    const todos = localStorage.getItem(this.state.localTodos)
    let tags = null
    if (todos != null) {
      let todosObj = Object.values(JSON.parse(todos))
      tags = this.getTags(todosObj)
      this.updateTodos(todosObj)
    } 
    if (tags != null) {
      this.updateTags(tags)
    } else {
      this.updateTags(['all', 'done'])
    }
  }

  setData(type) {
    let dataStr = ''
    if (type === 'todos') {
      dataStr = JSON.stringify(this.state.todos) 
      localStorage.setItem(this.state.localTodos, dataStr)
    } else if (type === 'tags') {
      dataStr = JSON.stringify(this.state.tags) 
      localStorage.setItem(this.state.localTags, dataStr)
    }
  }

  clearData() {
    localStorage.clear()
    this.resetTodos()
  }

  copyData() {
    const todos = JSON.stringify(JSON.parse(localStorage.getItem(this.state.localTodos)))
    alert(todos)
  }

  // Todos Add, Change, Delete

  addTodo(event) {
    event.preventDefault()
    let due = event.target[3].value
    due = due.length === 0 ? new Date() : new Date(due)
    due.setHours(23,59,59,0)
    let category = event.target[2].value
    category = category.length === 0 ? 'general' : category
    let newTodo = {
      name: event.target[0].value,
      id: this.getNextId(),
      tag: category,
      deadlineDate: due,
      createdDate: new Date(),
      done: false
    }
    this.addTag(category)
    let newTodos = this.state.todos
    newTodos.push(newTodo)
    event.target.reset()
    this.updateTodos(newTodos)
  }

  removeTodo(id) {
    let newTodos = this.state.todos.filter((todo) => {
      return todo.id !== id
    })
    this.updateTodos(newTodos)
  }

  resetTodos() {
    this.setState({todos: [], tags: []}, () =>
      this.getData()
    )
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

  updateTodos(newTodos) {
    this.setState({todos: newTodos}, () =>
      this.setData('todos')
    )
  }

  updateTags(newTags) {
    this.setState({tags: newTags}, () => {
      this.setData('tags')
      this.sortTags()
    })
  }

  // Tags/Categories

  addTag(newTag) {
    let index = this.state.tags.findIndex((e) => e===newTag)
    if (index < 0) {
      this.updateTags([newTag].concat(this.state.tags))
    }
  }

  changeFilter(event) {
    this.setState({filter: event.target.innerText})
  }

  sortTags() {
    let tags = this.state.tags.filter(tag => tag !== 'all' && tag !== 'done')
    let first = ['all', 'done']
    tags = first.concat(tags)
    this.setState({tags: tags})
  }
  
  getTags(todos) {
    let tags = new Set(['all', 'done'])
    todos.forEach(todo => {
      tags.add(todo.tag)
    })
    return Array.from(tags)
  }

  // Helper Functions

  getTemperature(dueStr) {
    const nowDate = new Date()
    const dueDate = new Date(dueStr)
    let timeDiff = dueDate.getTime() - nowDate.getTime()
    return Math.floor(timeDiff / (1000 * 3600 * 24))
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
      <div className="todo-area">
        <div className="todo-content">
          <div className="todo-control">
            <label>Testing Controls:</label>
            <button onClick={this.resetTodos}>Reset from Memory</button>
            <button onClick={this.clearData}>Clear Memory</button>
            <button onClick={this.copyData}>Copy Data</button>
          </div>
          <div className="tag-filters">
            <div className="label">Category</div>
            { this.state.tags.map((tag) =>
              <div 
                className={`filter ${tag === this.state.filter ? 'selected' : ''}`}
                onClick={this.changeFilter}
                key={tag}>
                  {tag}
              </div>
            )}
          </div>
          <div className="todo-list">
            { [].concat(this.state.todos)
              .filter(item => item.tag === this.state.filter || ('all' === this.state.filter && !item.done) || ('done' === this.state.filter && item.done))
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
                <input 
                  name="name"
                  type="text" 
                />
                <button type="submit" value="Submit">
                  ADD
                </button>
              </div>
              <div className="bottom">
                <div className="tag"> 
                  <label>Category: </label>
                  <input type="text" className="tag" list="tags" />
                  <datalist id="tags">
                    { this.state.tags.map(tag => 
                      ((tag !== 'all' && tag !== 'done') ? <option value={tag} key={tag} /> : '')
                    )}
                  </datalist>
                </div>
                <div className="due">
                  <label>Due Date: </label>
                  <input 
                    id="duedate"
                    type="date" 
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}