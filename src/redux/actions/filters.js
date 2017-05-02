import {actionTypes} from './actionTypes'
import axios from 'axios'

export const setAdvisorFilter = advisor => ({
  type: actionTypes.SET_ADVISOR_FILTER,
  payload: advisor,
})

export const setCategoryFilter = category => ({
  type: actionTypes.SET_CATEGORY_FILTER,
  payload: category,
})

export const search = keyword => dispatch => {
  dispatch(getSearchRequestAction())
  return axios.get(`https://itp.nyu.edu/ranch/proxy/proxy.php?mode=native&url=https://itp.nyu.edu/thesis2017/wp-content/themes/itpthesis/api.php?search=${keyword}`)
    .then(response => dispatch(getSearchSucceededAction(response.data)))
    .catch(error => dispatch(getSearchFailedAction(error)))
}

const getSearchRequestAction = () => ({
  type: actionTypes.SEARCH_PROJECT_REQUESTED,
})

const getSearchSucceededAction = payload => ({
  type: actionTypes.SEARCH_PROJECT_SUCCEEDED,
  payload,
})

const getSearchFailedAction = error => ({
  type: actionTypes.SEARCH_PROJECT_FAILED,
  payload: error,
})

export const resetSearch = () => ({
  type: actionTypes.RESET_SEARCH,
})
