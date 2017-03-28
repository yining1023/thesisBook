import React from 'react'
import s from './styles.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {advisorsIds} from '../constants/advisorIds'
import {resetSearch, search, setAdvisorFilter, setCategoryFilter} from '../redux/actions/filters'
import {getFilteredProjects} from '../redux/selectors/projects'
import {TextField} from 'material-ui'

const mapStateToProps = state => ({
  filters: state.filters,
  visibleProjects: getFilteredProjects(state),
  searchResults: state.searchResults
})

const styles = {
  customWidth: {
    width: 200,
  },
}

const actions = {
  setAdvisorFilter,
  setCategoryFilter,
  search,
  resetSearch,
}

class HomePage extends React.Component {

  // static propTypes = {
  //   articles: PropTypes.arrayOf(PropTypes.shape({
  //     student_id: PropTypes.string.isRequired,
  //     project_title: PropTypes.string.isRequired,
  //     student_name: PropTypes.string.isRequired,
  //   }).isRequired).isRequired,
  // }

  handleAdvisorChange = (event, index, value) => {
    this.props.setAdvisorFilter(value)
  }

  handleCategoryChange = (event, index, value) => {
    this.props.setCategoryFilter(value)
  }

  handleSearchChange = (event) => {
    if (event.target.value) {
      return this.props.search(event.target.value)
    }
    return this.props.resetSearch()
  }

  render() {
    const { advisor, category } = this.props.filters

    return (
      <div className={s.content}>
        <div className='filters'>
          <SelectField
            floatingLabelText="BY ADVISOR"
            value={advisor}
            onChange={this.handleAdvisorChange}
            style={styles.customWidth}
            autoWidth={false}
          >
            <MenuItem value='' primaryText='' />
            <MenuItem value={advisorsIds.ANDREW} primaryText='ANDREW LAZAROW' />
            <MenuItem value={advisorsIds.GABE} primaryText='GABRIEL BARCIA-COLOMBO' />
            <MenuItem value={advisorsIds.KATHERINE} primaryText='KATHERINE DILLON' />
            <MenuItem value={advisorsIds.KATHLEEN} primaryText='KATHLEEN WILSON' />
            <MenuItem value={advisorsIds.NANCY} primaryText='NANCY HECHINGER' />
            <MenuItem value={advisorsIds.ROBIN} primaryText='ROBIN REID' />
          </SelectField>

          <SelectField
            floatingLabelText="BY CATEGORY"
            value={category}
            onChange={this.handleCategoryChange}
            style={styles.customWidth}
            autoWidth={false}
          >
            <MenuItem value='' primaryText='' />
            <MenuItem value='hardware-product-design' primaryText='HARDWARE/PRODUCT DESIGN' />
            <MenuItem value='storytelling' primaryText='STORYTELLING' />
            <MenuItem value='uiux' primaryText='UI/UX' />
          </SelectField>
        </div>

        <TextField
          hintText='Keyword or Student Name'
          floatingLabelText='SEARCH'
          onChange={this.handleSearchChange}
        />

        <h4>Projects</h4>
        <ul>
          {this.props.visibleProjects.map(project =>
            <li key={project.student_id}>
              <Link to={'/project/' + `${project.student_slug}`} >
                {project.project_title}
              </Link>
              { } by {project.student_name}
            </li>
          )}
        </ul>
      </div>
    )
  }

}

export default connect(mapStateToProps, actions)(HomePage)
