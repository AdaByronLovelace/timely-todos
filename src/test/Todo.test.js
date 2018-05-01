import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Todo from '../components/Todo'


it('Todo renders without crashing', () => {
  shallow(<Todo 
    name="Test todo"
    createdDate={new Date()}
    deadlineDate={new Date()}
    tag="test"
    done={false}
    temp={0}
  />)
})

it('Todo renders correctly', () => {
  const tree = renderer
    .create(<Todo  
      name="Test todo"
      createdDate={new Date()}
      deadlineDate={new Date()}
      tag="test"
      done={false}
      temp={0}/>).toJSON
  expect(tree).toMatchSnapshot()
})


