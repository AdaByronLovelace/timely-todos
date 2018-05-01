import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Todo from '../components/Todo'

it('renders without crashing', () => {
  shallow(<Todo />)
})

it('renders correctly', () => {
  const mockCallback = jest.fn()
  const tree = renderer
    .create(<Todo  
      name="Test todo"
      createdDate={new Date()}
      deadlineDate={new Date()}
      tag="test"
      done={false}
      temp={0}
      onDone={mockCallback}
      onDelete={mockCallback}/>).toJSON
  expect(tree).toMatchSnapshot()
})

it('can determine temp classes correctly', () => {
  const wrapper = shallow(<Todo />)
  const testTemps = [
    { key: -2, val: 'ablaze' },
    { key: 0, val: 'hottest' },
    { key: 1, val: 'hottest' },
    { key: 3, val: 'hotter' },
    { key: 5, val: 'hot' },
    { key: 9, val: 'warmer' },
    { key: 13, val: 'warm' },
    { key: 17, val: 'tepid' },
    { key: 27, val: 'cool' },
    { key: 120, val: 'cold' }
  ]
  testTemps.map(temp => {
    expect(wrapper.instance().tempClass(temp.key)).toEqual(temp.val)
  })
})

it('can display a date correctly', () => {
  const dateNow = new Date()
  const wrapper = shallow(<Todo 
    createdDate={dateNow}
    deadlineDate={dateNow}
  />)
  const niceDate = dateNow.toLocaleDateString("en-US")
  expect(wrapper.instance().dateToString(dateNow)).toEqual(niceDate)
})

it('can handle done callback', () => {
  const mockCallback = jest.fn()
  const wrapper = shallow(<Todo 
    done={false}
    onDone={mockCallback}
  />)
  wrapper.find('div.checkbox-container').simulate('click')
  expect(mockCallback.mock.calls.length).toBe(1)
})

it('can handle delete callback', () => {
  const mockCallback = jest.fn()
  const wrapper = shallow(<Todo 
    onDelete={mockCallback}
  />)
  wrapper.find('div.delete').simulate('click')
  expect(mockCallback.mock.calls.length).toBe(1)
})


it('will add done class if prop done is passed', () => {
  const wrapper = shallow(<Todo 
    done={true}
  />)
  expect(wrapper.find('div.todo').hasClass('done')).toEqual(true)
})