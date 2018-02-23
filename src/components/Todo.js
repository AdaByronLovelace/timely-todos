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

  getDate(date) {
    let dateObj = new Date(date)
    return dateObj.toLocaleDateString("en-US")
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
          <div>TEMP {this.props.temp}</div>
          <div className="due">Due on { this.getDate(this.props.deadlineDate) }</div>
          <div>Created on { this.getDate(this.props.createdDate) }</div>
        </div>
      </div>
    )
  }
}

Todo.defaultProps = {
  tag: '',
  createdDate: (new Date()).toString(),
  deadlineDate: ((new Date().getMonth()+1)%12 + 1).toString(),
  name: '',
  done: false,
  temp: 0
}

Todo.propTypes = {
  tag: PropTypes.string,
  createdDate: PropTypes.string,
  deadlineDate: PropTypes.string,
  name: PropTypes.string,
  done: PropTypes.bool,
  temp: PropTypes.number
}
