import {expect} from 'chai'
import {projects} from '../../../src/redux/reducers/projects'
import {actionTypes} from '../../../src/redux/actions/actionTypes'

describe('Projects Reducer', () => {

  it('returns the state with new projects if action is GET_PROJECT_LIST_SUCCEEDED', () => {
    const beforeState = {}
    const payload = {
      asd: {
        project_id: 'asd',
        name: 'asd',
      }
    }

    const action = {
      type: actionTypes.GET_PROJECT_LIST_SUCCEEDED,
      payload,
    }

    expect(projects(beforeState, action)).to.eql(payload)
  })

  it('returns the original state if action is none of the above', () => {
    const beforeState = [{
      testProject: { foo: 'bar' }
    }]
    const action = {
      type: 'UNKNOWN_TYPE'
    }
    expect(projects(beforeState, action)).to.equal(beforeState)
  })
})
