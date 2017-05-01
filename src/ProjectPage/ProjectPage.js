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
import {isEmpty, get} from 'lodash'
import {Link} from 'react-router-dom'
import logo from '../img/itp-logo.svg'
import Slider from 'react-slick'
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import {IconButton} from 'material-ui'
import {setAdvisorFilter, setCategoryFilter} from '../redux/actions/filters'

const mapStateToProps = (state, ownProps) => ({
  projects: state.projects,
  studentSlug: ownProps.match.params.studentSlug,
  project: selectProject(state, ownProps.match.params.studentSlug),
})

const actions = { getProject, getProjects, setAdvisorFilter, setCategoryFilter }

const iconStyles = {
  marginTop: 11,
  width: 50
}

const createLeftArrow = () => {
  return <ArrowLeft />
}

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

  handleAdvisorChange = (value) => {
    this.props.setAdvisorFilter(value)
  }

  handleCategoryChange = (value) => {
    this.props.setCategoryFilter(value)
  }

  render() {
    const { project } = this.props

    return (
      <div className={s.content}>

        <div className={s.logoHeader} >
          <Link to="/" className={s.itpLogo}>
            <img className={s.logoImage} src={logo} alt={"ITP Thesis 2017"} />
          </Link>
        </div>

        <div className={s.greyHeader}>

          <div className={`${s.topicIcon}`}>
            <img src={require(`../img/${(get(project, 'topics.0.slug') !== '') ? get(project, 'topics.0.slug') : 'education'} copy.svg`)} alt={"topic-icon"} style={iconStyles} color="#292755" />
          </div>
          <h3 className={s.projectTitle} dangerouslySetInnerHTML={{ __html: project.project_title}}/>
          <h4 className={s.studentName}>{project.student_name}</h4>

          <hr className={s.separator}/>

          <div className={s.tagsTopicsAdvisor}>
            <p>Category:&nbsp;{project.topics.map((topic, i) =>
              <span key={i}>
                <Link to="/" onClick={() => this.handleCategoryChange(topic.slug)}>
                  {topic.name}
                </Link>
                {i === project.topics.length - 1 ? '' : ', '}
              </span>
              )}
            </p>

              <p>Advisor:&nbsp;
                <Link to="/" onClick={() => this.handleAdvisorChange(project.advisor_id)}>
                  {project.advisor_name}
                </Link>
              </p>
          </div>
        </div>

        <div className={s.bodyContainer}>

          <p className={s.shortDescription} dangerouslySetInnerHTML={{ __html: project.short_description}}></p>
          <br/>

          {
            project.slide_show.length > 0 &&
            <Slider
              dots={true}
              dotsClass={`slick-dots ${s.slickDots}`}
              infinite={true}
              arrows={true}
              autoplay={true}
              adaptiveHeight={true}
              pauseOnHover={true}
              autoplaySpeed={5000}
              prevArrow={<ArrowLeft />}
              nextArrow={<ArrowRight />}
              slidesToShow={1}
              slidesToScroll={1}
              swipe
            >
              {project.slide_show.map(slide =>
                <div>
                  <img rel="external" className={s.sliderImage} src={slide.src}/>
                  <p className={s.caption}>{slide.caption}</p>
                </div>
              )}
            </Slider>
          }

          {/*<div className={s.slideshowNavigation}>*/}
            {/*<div className={`${s.navDot} ${s.one}`}></div>*/}

          {/*</div>*/}

          <div className={s.longDescription}>
            <p className={s.bodyCopy} dangerouslySetInnerHTML={{ __html: project.description }} />

            {(project.video_presentation_url !== "") && <iframe src={project.video_presentation_url} width="100%" height="400px" />}
            {/*<p className={s.addLinks}><a target="_blank" rel="external" href={project.video_presentation_url}>Video Presentation</a></p>*/}

            <p className={s.bodyCopy} dangerouslySetInnerHTML={{ __html: project.further_reading }} />
            {project.project_url ? <p className={s.addLinks}><a target="_blank" rel="external" href={project.project_url}>Project Link</a></p> : null}

          </div>

        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps, actions)(ProjectPage)
