import axios from 'axios'
import {actionTypes} from './actionTypes'
import {reduce} from 'lodash'

export const getProjects = () => dispatch => {
  dispatch(getProjectsRequestAction())
  return axios.get('https://itp.nyu.edu/ranch/proxy/proxy.php?mode=native&url=https://itp.nyu.edu/thesis2016/wp-content/themes/itpthesis/api2.php?student_id=-1')
    .then(response => {

      // convert array of projects to object by id
      const byId = reduce(response.data, (acc, project) => {
        acc[project.student_slug] = project
        return acc
      }, {})

      dispatch(getProjectsSucceededAction(byId))

      return Promise.resolve(byId)
    })
    .catch(error => dispatch(getProjectsFailedAction(error)))
}

const getProjectsRequestAction = () => ({
  type: actionTypes.GET_PROJECT_LIST_REQUESTED,
})

const getProjectsSucceededAction = response => ({
  type: actionTypes.GET_PROJECT_LIST_SUCCEEDED,
  payload: response,
})

const getProjectsFailedAction = error => ({
  type: actionTypes.GET_PROJECT_LIST_FAILED,
  error,
})

export const getProject = id => dispatch => {
  dispatch(getProjectRequestAction())

  return axios.get(`https://itp.nyu.edu/ranch/proxy/proxy.php?mode=native&url=https://itp.nyu.edu/thesis2016/wp-content/themes/itpthesis/api2.php?student_id=${id}`)
    .then(response => dispatch(getProjectSucceededAction(response.data)))
    .catch(error => dispatch(getProjectFailedAction(error)))
}

const getProjectRequestAction = () => ({
  type: actionTypes.GET_PROJECT_REQUESTED,
})

const getProjectSucceededAction = response => ({
  type: actionTypes.GET_PROJECT_SUCCEEDED,
  payload: response,
})

const getProjectFailedAction = error => ({
  type: actionTypes.GET_PROJECT_FAILED,
  error,
})
