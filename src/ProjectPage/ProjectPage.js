import React from 'react'
import s from './styles.css'
import {connect} from 'react-redux'
import {getProject, getProjects} from '../redux/actions/projects'
import {selectProject} from '../redux/selectors/projects'
import {isEmpty} from 'lodash'

/**
 * TODO
 * use ONLY selectProject in mapStateToProps here
 * and get rid of projects and studentSlug,
 * after API supports query by slug rather than id
 */
const mapStateToProps = (state, ownProps) => ({
  projects: state.projects,
  studentSlug: ownProps.match.params.studentSlug,
  project: selectProject(state, ownProps.match.params.studentSlug),
})

const actions = { getProject, getProjects }

class ProjectPage extends React.Component {

  // static propTypes = {
  //   project: PropTypes.shape({
  //     student_name: PropTypes.string.isRequired,
  //     project_title: PropTypes.string.isRequired,
  //     project_question: PropTypes.string.isRequired,
  //     short_description: PropTypes.string.isRequired,
  //     description: PropTypes.string.isRequired,
  //     topics: PropTypes.array.isRequired
  //   }).isRequired,
  // }

  getFullProject(id) {
    return id ? this.props.getProject(id) : this.props.history.push('/error')
  }

  componentWillMount() {
    const { project, projects } = this.props

    if (isEmpty(projects)) {
      // Hack till the API is fixed
      return this.props.getProjects()
        .then(receivedProjects => {
          const prj = selectProject({ projects: receivedProjects }, this.props.studentSlug)
          this.getFullProject(prj.student_id)
        })
    }
    return this.getFullProject(project.student_id)
  }

  // TODO: some people's url is not working like shek.it
  render() {
    return (
      <div className={s.content}>
        <h3>{this.props.project.project_title}</h3>
        <h4>{this.props.project.student_name}</h4>

        <h4>{this.props.project.project_question}</h4>

        <p>Topics: {this.props.project.topics[0].name}</p>
        <p>Tags: {this.props.project.tags.map((tag, i) =>
            <span key={i}>{tag.name}, </span>
          )}
        </p>

        <p><a rel="external" href={this.props.project.video_presentation_url}>Video Presentation</a></p>
        {this.props.project.project_url ? <p><a rel="external" href={this.props.project.project_url}>Project Link</a></p> : null}

        <p>Advisor: {this.props.project.advisor_name}</p>
        <p>Description: {this.props.project.short_description}</p>
        <p dangerouslySetInnerHTML={{ __html: this.props.project.description }} />
        <p dangerouslySetInnerHTML={{ __html: this.props.project.further_reading }} />

        <div>
          {this.props.project.slide_show.map(slide =>
            <div key={slide.title}>
              <img rel="external" src={slide.src} />
              <p>{slide.caption}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps, actions)(ProjectPage)
