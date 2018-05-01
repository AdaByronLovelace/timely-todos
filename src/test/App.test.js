import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import App from '../App'


it('App renders without crashing', () => {
  shallow(<App />)
})

it('App renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON
    expect(tree).toMatchSnapshot()
})

it('App renders a header', () => {
  const wrapper = shallow(<App />)
  const header = <header className="App-header">
    <h1 className="App-title">Timely To Dos</h1>
  </header>
  expect(wrapper.contains(header)).toEqual(true)
})

