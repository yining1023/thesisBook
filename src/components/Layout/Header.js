import React from 'react'
import Navigation from './Navigation'
import {Link} from 'react-router-dom'
import s from './Header.css'
import FilterMenu from '../FilterMenu/FilterMenu'
import logo from '../../img/itp-logo.png'


class Header extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root)
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root)
  }

  render() {
    return (
      <header className={`mdl-layout__header ${s.header}`} ref={node => (this.root = node)}>
        <div className={`mdl-layout__header-row ${s.row}`}>
          <Link className={`mdl-layout-title`} to="/">
            <img className={`${s.title}`} src={logo} alt={"ITP Thesis 2017"} />
          </Link>
          <div className="mdl-layout-spacer" />
          <Navigation />
          <FilterMenu />
        </div>
      </header>
    )
  }

}

export default Header
