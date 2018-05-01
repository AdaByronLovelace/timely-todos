import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import App from '../App'


test('App renders without crashing', () => {
  shallow(<App />)
})

test('App renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON
    expect(tree).toMatchSnapshot()
})

