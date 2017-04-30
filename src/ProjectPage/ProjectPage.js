/**
 * TODO
 * use ONLY selectProject in mapStateToProps here
 * and get rid of projects and studentSlug,
 * after API supports query by slug rather than id
 */
import React from 'react'
import s from './ProjectPage.css'
import {connect} from 'react-redux'
import {getProject, getProjects} from '../redux/actions/projects'
import {selectProject} from '../redux/selectors/projects'
import topicIcon from '../img/topic-icon.svg'
import {isEmpty} from 'lodash'
import {Link} from 'react-router-dom'
import logo from '../img/itp-logo.svg'

const mapStateToProps = (state, ownProps) => ({
  projects: state.projects,
  studentSlug: ownProps.match.params.studentSlug,
  project: selectProject(state, ownProps.match.params.studentSlug),
})

const actions = { getProject, getProjects }

// can write a function outside of the class

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



  render() {

    return (
      <div className={s.content}>

        <div className={s.logoHeader} >
          <Link to="/" className={s.itpLogo}>
            <img className={s.logoImage} src={logo} alt={"ITP Thesis 2017"} />
          </Link>
        </div>

        <div className={s.greyHeader}>

          <div className={s.iconContainer}>
            <img className={`${s.topicIcon}`} src={topicIcon} alt={"data vis"} />
          </div>
          <h3 className={s.projectTitle}>{this.props.project.project_title}</h3>
          <h4 className={s.studentName}>{this.props.project.student_name}</h4>

          <hr className={s.separator}/>

          <div className={s.tagsTopicsAdvisor}>
            <p>Category: {this.props.project.topics.map((topic, i) =>
                <span key={i}>{topic.name}, </span>
              )}
            </p>
            <p>Advisor: {this.props.project.advisor_name}</p>
          </div>
        </div>

        <div className={s.bodyContainer}>

          <p className={s.shortDescription} dangerouslySetInnerHTML={{ __html: this.props.project.short_description}}></p>
          <br/>
          <div className={s.slideshow}>
            {this.props.project.slide_show.map((slide, index) =>
              <div key={slide.title} className={index+1}>
                <img rel="external" src={slide.src} />
                <p className={s.caption}>{slide.caption}</p>
              </div>

            )}
          </div>
          <div className={s.slideshowNavigation}>
            <div className={`${s.navDot} ${s.one}`}></div>

          </div>

          <div className={s.longDescription}>
            <p className={s.bodyCopy} dangerouslySetInnerHTML={{ __html: this.props.project.description }} />
            <p className={s.bodyCopy} dangerouslySetInnerHTML={{ __html: this.props.project.further_reading }} />

            <p className={s.addLinks}><a target="_blank" rel="external" href={this.props.project.video_presentation_url}>Video Presentation</a></p>
            {this.props.project.project_url ? <p className={s.addLinks}><a target="_blank" rel="external" href={this.props.project.project_url}>Project Link</a></p> : null}

          </div>

        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps, actions)(ProjectPage)
