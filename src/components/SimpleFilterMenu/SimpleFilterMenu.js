import React from 'react'
import s from './SimpleFilterMenu.css'
import {connect} from 'react-redux'
import {resetSearch, search, setAdvisorFilter, setCategoryFilter} from '../../redux/actions/filters'
import {getFilteredProjects} from '../../redux/selectors/projects'
import {Link} from 'react-router-dom'
import {debounce} from 'lodash'

const mapStateToProps = state => ({
  filters: state.filters,
  visibleProjects: getFilteredProjects(state),
  searchResults: state.searchResults
})

const actions = {
  setAdvisorFilter,
  setCategoryFilter,
  search,
  resetSearch,
}

class SimpleFilterMenu extends React.Component {

  constructor(props) {
    super(props)
    this.handleSearchChange = debounce(this.handleSearchChange, 200)
  }

  handleAdvisorChange = (event, index, value) => {
    this.props.setAdvisorFilter(value)
  }

  handleCategoryChange = (event, index, value) => {
    this.props.setCategoryFilter(value)
  }

  handleSearchChange = (event, value) => {
    if (value) {
      return this.props.search(value)
    }
    return this.props.resetSearch()
  }

  render() {
    const { advisor, category } = this.props.filters

    return (
      <div className={s.filters}>
        <Link className={s.navigationLink} to="/about">
          ABOUT
        </Link>
      </div>
    )
  }

}

export default connect(mapStateToProps, actions)(SimpleFilterMenu)
