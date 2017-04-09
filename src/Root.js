import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import ProjectPage from './ProjectPage/ProjectPage'
import {ErrorPage} from './ErrorPage/ErrorPage'
import {AboutPage} from './AboutPage/AboutPage'
import Header from './components/Layout/Header'
import {getProjects} from './redux/actions/projects'
import {connect} from 'react-redux'
import s from './Root.css'

class Root extends React.Component {
  componentWillMount() {
    this.props.getProjects()
  }

  render() {
    return (
      <Router>
        <div className={s.container}>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/project/:studentSlug' component={ProjectPage} />
            <Route path='/about' component={AboutPage} />
            <Route path='/error' component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(null, { getProjects })(Root)
