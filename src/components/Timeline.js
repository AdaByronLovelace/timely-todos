import React from 'react'
import Event from './Event'
import './Timeline.css'

export default class Timeline extends React.Component {
  constructor(props) {
    super(props)
    this.addEvent = this.addEvent.bind(this)
    this.getData = this.getData.bind(this)
    this.setData = this.setData.bind(this)
    this.clearData = this.clearData.bind(this)
    this.copyData = this.copyData.bind(this)

    this.state = {
      events: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const events = localStorage.getItem(eventsStore)
    if (events != null) {
      let eventsObj = Object.values(JSON.parse(events))
      this.setState({events: eventsObj}, () =>
        this.setData()
      )
    }
  }

  setData() {
    const dataStr = JSON.stringify(this.state.events) 
    localStorage.setItem(eventsStore, dataStr)
  }

  clearData() {
    localStorage.clear()
    this.setState({events: []})
  }

  copyData() {
    const events = JSON.stringify(JSON.parse(localStorage.getItem(eventsStore)))
    alert(events)
  }

  // Todos Add, Change, Delete

  addEvent(e) {
    e.preventDefault()
    let newEvent = {
      name: e.target[0].value,
      desc: e.target[1].value,
      date: e.target[2].value,
      order: e.target[3].value,
    }
    let newEvents = this.state.events
    newEvents.push(newEvent)
    e.target.reset()
    this.setState({events: newEvents}, () =>
      this.setData()
    )
  }

  compareEvents(a,b) {
    let aEvent = a.order
    let bEvent = b.order
    if (aEvent < bEvent) return -1
    else if (bEvent < aEvent) return 1
    else return 0
  }

  render() {    
    return (
      <div className="timeline-container">

        <div className="app-control">
          <label>Testing Controls:</label>
          <button onClick={this.resetEvents}>Reset from Memory</button>
          <button onClick={this.clearData}>Clear Memory</button>
          <button onClick={this.copyData}>Copy Data</button>
        </div>
          
        <div className="event-list">
          { [].concat(this.state.events)
            .sort(this.compareEvents)
            .map(item =>
              <Event
                name={item.name}
                order={item.order}
                date={item.date}>
                { item.desc }
              </Event>
          )}
        </div>

        <label>Add Event</label>
        <form className="event-form" onSubmit={this.addEvent}>
          <label>Event Name:</label>
          <input 
            name="name"
            type="text" 
          />
          <label>Description:</label>
          <textarea
            name="desc"
          />
          <label>Date:</label>
          <input 
            id="date"
            type="date" 
          />
          <label>Order:</label>
          <input 
            id="order"
            type="number" 
          />
          <button type="submit" value="Submit">
            ADD
          </button>
        </form>

      </div>
    )
  }
}

/* Constants */

const eventsStore = 'aion'