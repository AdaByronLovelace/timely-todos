import React from 'react'
import PropTypes from 'prop-types'
import './Timeline.css'

export default class Event extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="event">
        <div>Order {this.props.order}</div>
        <div className="name">
          {this.props.name}
        </div>
        <div className="desc">
          { this.props.children }
        </div>
        <div className="date">
          {this.props.date}
        </div>
      </div>
    )
  }
}

Event.defaultProps = {
  order: 0,
  date: (new Date()).toString(),
  name: "event"
}

Event.propTypes = {
  order: PropTypes.number,
  date: PropTypes.date,
  name: PropTypes.string
}