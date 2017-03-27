import React from 'react'
import { store } from '../../redux/store'
import {actionTypes} from '../../redux/actions/actionTypes'

const FilterLink = ({filter, children}) => {
  return (
    <a href='#'
       onClick={e => {
         e.preventDefault()
         store.dispatch({
           type: actionTypes.SET_VISIBILITY_FILTER,
           filter
         })
       }}
    >
      {children}
    </a>
  )
}

export default FilterLink
