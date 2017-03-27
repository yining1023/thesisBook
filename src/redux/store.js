/**
 * From Redux Middleware documentation:
 *
 * What is Thunk?
 * Lets you dispatch a function instead of an action.
 * This function will receive `dispatch` and `getState` as arguments.
 *
 * Useful for early exits (conditions over `getState()`), as well
 * as for async control flow (it can `dispatch()` something else).
 *
 * `dispatch` will return the return value of the dispatched function.
 */
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {projects} from './reducers/projects'
import {visibilityFilter} from './reducers/visibilityFilter'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action)

const reducers = combineReducers({
  projects,
  visibilityFilter,
})

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
