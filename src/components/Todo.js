import React from 'react'
import PropTypes from 'prop-types'

export default class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.handleCheck = this.handleCheck.bind(this)
    this.state = {
      done: false,
      temp: 2
    }
  }

  getTemperature(created) {
    const now = new Date()
    let diff = now - this.props.deadlineDate
    return diff.toString()
  }

  tempClass() {
    // eslint-disable-next-line
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

// TODO: fix the input so only the span exists, and maybe convert label to flexbox

  render() {
    return (
      <div className={`todo ${this.tempClass()}`}>
        <label className={`text ${this.state.done ? 'done' : 'todo'}`}>
          <input type="checkbox" 
            onChange={this.handleCheck} 
            defaultChecked={this.props.done}/>
          <span class="checkmark"></span>
          { this.props.name }
          <span class="delete"></span>
        </label>
        <div className="bottom">
          <div className="tag">{ this.props.tag }</div>
          <div className="due">Due on { this.props.deadlineDate.toLocaleDateString("en-US") }</div>
        </div>
        
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
