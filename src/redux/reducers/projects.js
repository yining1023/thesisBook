import {actionTypes} from '../actions/actionTypes'

export const projects = (state = {}, action) => {
  switch (action.type) {

  case actionTypes.GET_PROJECT_LIST_SUCCEEDED:
    return {...action.payload}

  case actionTypes.GET_PROJECT_SUCCEEDED: {
    const project = { ...action.payload}

    // new project received
    // now replace the project with that id with the new one in our object
    return {
      ...state,
      [project.student_slug]: project
    }
  }

  default:
    return state
  }
}
