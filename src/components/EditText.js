import React from 'react'
import PropTypes from 'prop-types'

export default class EditText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      value: ''
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getInput = this.getInput.bind(this)
    this.getStatic = this.getStatic.bind(this)
  }

  componentDidMount() {
    let value = this.props.value;
    if (this.props.type === 'date') {
      if (value !== '') {
        value = new Date(this.props.value)
      } else {
        value = new Date()
      }
    } 
    this.setState({value: value})
  }

  getInput() {
    if (this.props.type === 'text' || this.props.type === 'date') {
      return (
        <input type={this.props.type} defaultValue={this.state.value} className={`${this.props.type}-input`}/>
      )
    } else if (this.props.type === 'tags') {
      return (
        <div className="tags">
          <input type="text" className="tag" list="tags" />
          <datalist id="tags">
            { this.props.tags.map(tag => 
              ((tag !== 'all' && tag !== 'done') ? <option value={tag} key={tag} /> : '')
            )}
          </datalist>
        </div>
      )
    }
  }

  getStatic() {
    if (this.props.type === 'text') {
      return (
        <div>{this.state.value}</div>
      )
    } else if (this.props.type === 'date') {
      return (
        <div className="due">Due on { this.props.value }</div>
      )
    }
  }

  handleClick(e) {
    this.setState({edit: true})
  }

  handleBlur(e) {
    e.persist()
    this.setState({edit: false, value: e.target.value}, () => {
      //do something
    })
  }

  render() {
    return (
      <div 
        className={`edit-${this.props.type}`}
        onBlur={this.handleBlur}
        onClick={this.handleClick}>
        {
          this.state.edit ? this.getInput() : this.getStatic()
        }
      </div>
    )
  }
}

EditText.defaultProps = {
  value: '',
  type: '',
  tags: []
}

EditText.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
}