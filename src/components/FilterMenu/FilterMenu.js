import React from 'react'
import s from './FilterMenu.css'
import {connect} from 'react-redux'
import {advisorNames} from '../../constants/advisorIds'
import {resetSearch, search, setAdvisorFilter, setCategoryFilter} from '../../redux/actions/filters'
import {getFilteredProjects} from '../../redux/selectors/projects'
import {MenuItem, SelectField, TextField} from 'material-ui'
import {Link} from 'react-router-dom'
import {capitalize, debounce, map} from 'lodash'
import {categories} from '../../constants/categories'

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

class FilterMenu extends React.Component {

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

        <SelectField
          autoWidth={true}
          floatingLabelText="BY TOPIC"
          value={category}
          onChange={this.handleCategoryChange}
          floatingLabelStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
          labelStyle={{color: 'white'}}
          style={{fontSize: '14px'}}
          selectedMenuItemStyle={{fontWeight: 900, color: '#403ca0'}}
        >
          <MenuItem value='' primaryText='' />
          {
            map(
              categories,
              (name, slug) => <MenuItem key={slug} value={slug} primaryText={name} />
            )
          }
        </SelectField>
        &nbsp;&nbsp;
        <SelectField
          autoWidth={true}
          floatingLabelText="BY ADVISOR"
          value={advisor}
          onChange={this.handleAdvisorChange}
          floatingLabelStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
          labelStyle={{color: 'white'}}
          selectedMenuItemStyle={{color: '#403ca0'}}
          style={{fontSize: '14px'}}
        >
          <MenuItem value='' primaryText='' />
          {
            map(
              advisorNames,
              (name, id) => <MenuItem key={`advisor-filter-${id}`} value={id} primaryText={name} />
            )
          }
        </SelectField>
        &nbsp;&nbsp;
        <TextField
          hintText='Keyword or Student Name'
          floatingLabelText='SEARCH'
          onChange={this.handleSearchChange}
          underlineFocusStyle={{borderColor: 'white'}}
          floatingLabelStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
          floatingLabelFocusStyle={{color: 'white'}}
          hintStyle={{ color: 'rgba(255, 255, 255, 0.39)' }}
          inputStyle={{color: 'white'}}
          style={{fontSize: '14px'}}
        />
        &nbsp;&nbsp;
        <Link className={s.navigationLink} to="/about">
          ABOUT
        </Link>
      </div>
    )
  }

}

export default connect(mapStateToProps, actions)(FilterMenu)
