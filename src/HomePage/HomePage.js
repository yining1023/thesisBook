import React from 'react'
import s from './styles.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = state => ({
  projects: Object.values(state.projects),
})

@connect(mapStateToProps)
export class HomePage extends React.Component {

  // static propTypes = {
  //   articles: PropTypes.arrayOf(PropTypes.shape({
  //     student_id: PropTypes.string.isRequired,
  //     project_title: PropTypes.string.isRequired,
  //     student_name: PropTypes.string.isRequired,
  //   }).isRequired).isRequired,
  // }

  render() {
    return (
      <div className={s.content}>
        <h4>Projects</h4>
        <ul>
          {this.props.projects.map(project =>
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
