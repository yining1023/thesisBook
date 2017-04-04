import React from 'react'
import {Link} from 'react-router-dom'
import s from './Navigation.css'

class Navigation extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root)
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root)
  }

  render() {
    return (
      <nav className={s.navigation} ref={node => (this.root = node)}>
        <Link className={s.navigationLink} to="/about">ABOUT</Link>
      </nav>
    )
  }

}

export default Navigation
