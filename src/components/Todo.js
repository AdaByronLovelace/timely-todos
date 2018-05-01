import React from 'react'
import PropTypes from 'prop-types'

export default class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  tempClass(temp) {
    if (temp < 0) return 'ablaze'
    else if (temp < 2) return 'hottest'
    else if (temp < 4) return 'hotter'
    else if (temp < 6) return 'hot'
    else if (temp < 10) return 'warmer'
    else if (temp < 14) return 'warm'
    else if (temp < 21) return 'tepid'
    else if (temp < 28) return 'cool'
    else return 'cold'
  }

  handleDelete(event) {
    this.props.onDelete(this.props.id)
  }

  handleDone(event) {
    this.props.onDone(this.props.id)
  }

  dateToString(date) {
    return new Date(date).toLocaleDateString("en-US")
  }

  render() {
    return (
      <div className={`todo ${this.tempClass(this.props.temp)} ${this.props.done ? 'done' : 'open'}`}>
        <div className="top">
          <div className="checkbox-container" 
            onClick={this.handleDone}>
            <input type="checkbox" />
            <span className="checkmark"></span>
          </div>
          <div className="text">
            { this.props.name }
          </div>
          <div className="delete-container">
            <div 
              onClick={this.handleDelete}
              className="delete">
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="tag">{ this.props.tag }</div>
          <div className="due">Due on { this.dateToString(this.props.deadlineDate) }</div>
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
  done: false,
  temp: 0
}

Todo.propTypes = {
  tag: PropTypes.string,
  createdDate: PropTypes.instanceOf(Date),
  deadlineDate: PropTypes.instanceOf(Date),
  name: PropTypes.string,
  done: PropTypes.bool,
  temp: PropTypes.number,
  onDone: PropTypes.func,
  onDelete: PropTypes.func
}
