import React from 'react'
import PropTypes from 'prop-types'

export default class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.handleCheck = this.handleCheck.bind(this)
    this.state = {
      done: false,
      temp: 0
    }
  }

  getTemperature(created) {
    const now = new Date()
    let diff = now - this.props.deadlineDate
    return diff.toString()
  }

  tempClass() {
    switch (this.state.temp) {
      case 0: return 'cold'
      case 1: return 'cool'
      case 2: return 'tepid'
      case 3: return 'warm'
      case 4: return 'hot'
    }
  }

  handleCheck(event) {
    this.setState({done: event.target.checked})
  }

  render() {
    return (
      <div className={`todo ${this.tempClass()}`}>
        <input type="checkbox" 
          onChange={this.handleCheck} 
          defaultChecked={this.props.done}/>
        <div className={`text ${this.state.done ? 'done' : 'todo'}`}>{ this.props.name }</div>
        <div className="temp">{ this.getTemperature() }</div>
        <div className="tag">{ this.props.tag }</div>
        <div className="due">{ this.props.deadlineDate.toString() }</div>
        <div className="desc">{ this.props.desc }</div>
      </div>
    )
  }
}

Todo.defaultProps = {
  tag: '',
  createdDate: new Date(),
  deadlineDate: new Date(),
  name: '',
  desc: ''
}

Todo.propTypes = {
  tag: PropTypes.string,
  createdDate: PropTypes.instanceOf(Date),
  deadlineDate: PropTypes.instanceOf(Date),
  name: PropTypes.string,
  desc: PropTypes.string
}
