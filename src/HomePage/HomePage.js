import React from 'react'
import s from './HomePage.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {resetSearch, search, setAdvisorFilter, setCategoryFilter} from '../redux/actions/filters'
import {getFilteredProjects} from '../redux/selectors/projects'
import {Card, CardText} from 'material-ui'
import ActionHome from 'material-ui/svg-icons/action/home'
import {indigo500} from 'material-ui/styles/colors'

const mapStateToProps = state => ({
  filters: state.filters,
  visibleProjects: getFilteredProjects(state),
  searchResults: state.searchResults
})

const iconStyles = {
  marginLeft: 21,
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

  constructor(props) {
    super(props)
    this.state = {
      projectHeading: '',
      projectTopics: '',
    }
  }

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

  mapScroll(e) {
    this.list.scrollLeft -= e.deltaX + e.deltaY
    e.preventDefault()
  }

  mouseIn(project) {
    this.setState({
      projectHeading: project.project_question,
      projectTopics: project.topics[0].name,
    })
  }

  mouseOut() {
    this.setState({
      projectHeading: '',
      projectTopics: '',
    })
  }

  render() {

    return (
      <div className={s.content}>
        <div className={s.projectPreview}>
          <div className={s.projectQuestion}>
            {this.state.projectHeading}
          </div>
        </div>
        <div className={s.projectPreviewSmall}>
          <div className={s.projectTopics}>
            {this.state.projectTopics}
          </div>
        </div>
        <ul ref={(elem) => {this.list = elem} } className={s.projectList} onWheel={this.mapScroll.bind(this)}>
          {this.props.visibleProjects.map(project =>
            <Card className={s.projectCard}
                  key={project.student_id}
                  onMouseEnter={this.mouseIn.bind(this, project)}
                  onMouseLeave={this.mouseOut.bind(this)}>
              <Link to={'/project/' + `${project.student_slug}`} className={s.a}>
                <ActionHome color={indigo500} style={iconStyles}/>
                <CardText className={s.verticalText}>
                  {project.student_name}
                </CardText>
              </Link>
            </Card>
          )}
        </ul>

      </div>
    )
  }

}

export default connect(mapStateToProps, actions)(HomePage)
