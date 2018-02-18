import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Tag extends Component {
  getTemperature() {
    const now = new Date()
    return now - this.props.createdDate
  }
  render() {
    // const tags = this.props.tags || []
    return (
      <a 
        className={`tag ${this.props.color}`}
        href={this.props.href}>
        {this.props.name}
      </a>
    )
  }
}

Tag.defaultProps = {
  color: '',
  name: '',
  link: ''
}

Tag.PropTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.string
}