import React from 'react'
import s from './styles.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import FilterLink from '../components/FilterLink/FilterLink'
import {getVisibleProjects} from '../redux/actions/visibilityFilters'

const mapStateToProps = state => ({
  projects: Object.values(state.projects),
  visibilityFilter: state.visibilityFilter
})

const actions = { getVisibleProjects }

class HomePage extends React.Component {

  // static propTypes = {
  //   articles: PropTypes.arrayOf(PropTypes.shape({
  //     student_id: PropTypes.string.isRequired,
  //     project_title: PropTypes.string.isRequired,
  //     student_name: PropTypes.string.isRequired,
  //   }).isRequired).isRequired,
  // }

  render() {
    const visibleProjects = getVisibleProjects(
      this.props.projects,
      this.props.visibilityFilter
    )

    return (
      <div className={s.content}>
        <h4>Projects</h4>
        <p>
          show:
          {'  '}
          <FilterLink
            filter='SHOW_ALL'
          >
            ALL
          </FilterLink>
          {'  '}
          <FilterLink
            filter='SHOW_CATEGORY_SOFTWARE'
          >
            SOFTWARE DESIGN
          </FilterLink>{'  '}
          <FilterLink
            filter='SHOW_CATEGORY_HARDWARE'
          >
            HARDWARE/ PRODUCT DESIGN
          </FilterLink>
        </p>

        <ul>
          {visibleProjects.map(project =>
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
