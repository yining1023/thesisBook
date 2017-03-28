import {projects} from './projects'
import {combineReducers} from 'redux'
import {filters} from './filters'

export default combineReducers({
  projects,
  filters,
})
