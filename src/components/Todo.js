import React from 'react'
import PropTypes from 'prop-types'

export default class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  tempClass(temp) {
    if (temp < 2) return 'hot'
    else if (temp < 4) return 'warm'
    else if (temp < 7) return 'tepid'
    else if (temp < 14) return 'cool'
    else return 'cold'
  }

  handleDelete(event) {
    this.props.onDelete(this.props.id)
  }

  handleDone(event) {
    this.props.onDone(this.props.id)
  }

  render() {
    return (
      <div className={`todo ${this.tempClass(this.props.temp)}`}>
        <div className={`text ${this.props.done ? 'done' : 'open'}`}>
          <span className="checkbox-container" 
            onClick={this.handleDone}>
            <input type="checkbox" />
            <span className="checkmark"></span>
          </span>
          { this.props.name }
          <span 
            onClick={this.handleDelete}
            className="delete">
          </span>
        </div>
        <div className="bottom">
          <div className="tag">{ this.props.tag }</div>
          <div>TEMP {this.props.temp}</div>
          <div className="due">Due on { this.props.deadlineDate.toLocaleDateString("en-US") }</div>
        </div>
      </div>
    )
  }
}

Todo.defaultProps = {
  tag: '',
  createdDate: new Date(),
  deadlineDate: new Date(),
  name: '',
  done: false
}

Todo.propTypes = {
  tag: PropTypes.string,
  createdDate: PropTypes.instanceOf(Date),
  deadlineDate: PropTypes.instanceOf(Date),
  name: PropTypes.string,
  done: PropTypes.bool
}
