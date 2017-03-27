import axios from 'axios'

/**
 * This is an example SYNC action creator
 * it simply returns an action object
 */
export const somethingReceivedActionCreator = response => ({
  type: 'SOMETHING_RECEIVED',
  payload: response,
})

/**
 * This is an example ASYNC action creator
 * it returns a function that is passed `dispatch` function by redux
 * when it is called.
 *
 * Inside that function you can call any async action directly.
 * @returns {Function}
 */
export const asyncActionCreator = function (id) {
  /** this returned function is called when you dispatch the action and the `dispatch` function
   * is passed as an argument to it
   */
  return function (dispatch) {
    return axios.get('/asd/' + id)
      .then(response => dispatch(somethingReceivedActionCreator(response)))
      // .catch(error => dispatch(failedActionCreator(error)))

  }
}

/**
 * ES6 way to write the above (preferred) =>
 */

export const asyncActionCreatorES6 = url => dispatch =>
  axios.get(url)
    .then(response => dispatch(somethingReceivedActionCreator(response)))
  // .catch(error => dispatch(failedActionCreator(error)))

