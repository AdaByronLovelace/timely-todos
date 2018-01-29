import React from 'react'
import './Todo.css'

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.props.handleValueChange(event.target.value)
  }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value)
  //   console.log(this.state.value)
  //   event.preventDefault()
  // }

  render() {
    const value = this.props.value
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New Todo:
          <input 
            type="text" 
            value={value} 
            onChange={this.handleChange} 
          />
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
    );
  }
}