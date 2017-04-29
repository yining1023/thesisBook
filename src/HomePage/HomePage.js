import React from 'react'
import s from './HomePage.css'
import {connect} from 'react-redux'
import {resetSearch, search, setAdvisorFilter, setCategoryFilter} from '../redux/actions/filters'
import {getFilteredProjects} from '../redux/selectors/projects'
import {Card, CardText} from 'material-ui'
import Header from '../components/Layout/Header'
import {categories} from '../constants/categories'
import {advisorNames} from '../constants/advisorIds'
import ClearIcon from 'material-ui/svg-icons/navigation/close'
import {get} from 'lodash'

const mapStateToProps = state => ({
  filters: state.filters,
  visibleProjects: getFilteredProjects(state),
  searchResults: state.searchResults
})

const iconStyles = {
  marginLeft: 15,
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
    const topics = project.topics.reduce((acc, val, index) => {
      if (index === 0) return acc + val.name
      return acc + ' | ' + val.name
    }, '')

    this.setState({
      projectHeading: project.project_question,
      projectTopics: topics,
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

  clearFilters() {
    this.props.setCategoryFilter('')
    this.props.setAdvisorFilter('')
    this.props.resetSearch()
  }

  render() {
    const { advisor, category, search } = this.props.filters
    return (
      <div className={s.content}>
        <Header />
        <div className={s.wrapper}>
          {
            <article className={`${s.projectQuestionContainer} ${this.state.projectHeading ? s.appear : '' }`}>
              <div className={s.hoveredTitle}>
                {this.state.projectHeading}
              </div>
              <div className={s.hoveredSubtitle}>
                {this.state.projectTopics}
              </div>

            </article>
          }
          {
            (!this.state.projectHeading && (advisor || category || search) ) &&
            <article className={`${s.projectQuestionContainer} ${!this.state.projectHeading ? s.appear : '' }`}>
              {
                advisor && <div>
                  <div className={s.hoveredSubtitle}>ADVISOR</div>
                  <div className={s.hoveredTitle}>{advisorNames[advisor]}</div>
                </div>
              }
              {
                category && <div>
                  <div className={s.hoveredSubtitle}>TOPIC</div>
                  <div className={s.hoveredTitle}>{categories[category]}</div>
                </div>

              }
              {
                get(search, 'length') === 0 &&
                <div className={s.hoveredTitle}>No Results Found</div>
              }
              {
                get(search, 'length') > 0 &&
                <div className={s.hoveredTitle}>Search Results</div>
              }

              <a className={s.clearFiltersButton} onClick={() => this.clearFilters()}>
                <ClearIcon style={{color: 'white'}}/>
                &nbsp;CLEAR
              </a>
            </article>
          }
        </div>

        <ul ref={(elem) => {this.list = elem} } className={s.projectList} onWheel={this.mapScroll.bind(this)}>
          {this.props.visibleProjects
            .filter(project => { return project.student_id !== "" })
            .map(project =>
            <Card className={s.projectCard}
                  key={project.student_id}
                  onClick={this.navigateTo.bind(this, `/project/${project.student_slug}`) }
                  onMouseEnter={this.mouseIn.bind(this, project)}
                  onMouseLeave={this.mouseOut.bind(this)}>
              <img className={`${s.topicIcon}`} src={require(`../img/${(project.topics.length > 0) ? project.topics[0].slug : 'education'}.svg`)} alt={"topic-icon"} style={iconStyles} />
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
