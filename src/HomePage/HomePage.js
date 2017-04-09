import React from 'react'
import s from './HomePage.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {resetSearch, search, setAdvisorFilter, setCategoryFilter} from '../redux/actions/filters'
import {getFilteredProjects} from '../redux/selectors/projects'
import {Card, CardText} from 'material-ui'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'
import topicIcon from '../img/topic-icon.svg'

const mapStateToProps = state => ({
  filters: state.filters,
  visibleProjects: getFilteredProjects(state),
  searchResults: state.searchResults
})

const iconStyles = {
  marginLeft: 17,
  marginTop: 20
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

  navigateTo(url) {
    this.props.history.push(url)
  }

  render() {
    return (
      <div className={s.content}>
        <div className={s.wrapper}>

          <aside className={s.aside}>
            <Link className={s.navigationLink} to="/about">
              <InfoOutline style={iconStyles} color={'white'} />
            </Link>
          </aside>

          <article className={s.projectQuestionContainer}>
            <div className={s.projectPreview}>
              <div className={`${s.projectQuestion} ${this.state.projectHeading ? s.appear : '' }`}>
                {this.state.projectHeading}
              </div>
            </div>

            <div className={s.projectPreviewSmall}>
              <div className={s.projectTopics}>
                {this.state.projectTopics}
              </div>
            </div>
          </article>

        </div>

        <ul ref={(elem) => {this.list = elem} } className={s.projectList} onWheel={this.mapScroll.bind(this)}>
          {this.props.visibleProjects.map(project =>
            <Card className={s.projectCard}
                  key={project.student_id}
                  onClick={this.navigateTo.bind(this, `/project/${project.student_slug}`) }
                  onMouseEnter={this.mouseIn.bind(this, project)}
                  onMouseLeave={this.mouseOut.bind(this)}>
              <img className={`${s.topicIcon}`} src={topicIcon} alt={"data vis"} style={iconStyles} />
              <CardText className={s.verticalText}>
                {project.student_name}
              </CardText>
            </Card>
          )}
        </ul>

      </div>
    )
  }

}

export default connect(mapStateToProps, actions)(HomePage)
