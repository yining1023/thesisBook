import React from 'react'
import {Link} from 'react-router-dom'
import s from './SimpleHeader.css'
import logo from '../../img/itp-logo-tisch.svg'
import {Drawer, IconButton} from 'material-ui'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import SimpleFilterMenu from '../SimpleFilterMenu/SimpleFilterMenu'

class SimpleHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showDrawer: false,
    }
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root)
    window.onresize = () => this.setState({ showDrawer: false })
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root)
  }

  toggleDrawer() {
    this.setState({
      showDrawer: !this.state.showDrawer,
    })
  }

  render() {
    return (
      <header className={`mdl-layout__header ${s.header}`} ref={node => (this.root = node)}>
        <div className={`mdl-layout__header-row ${s.row}`}>
          <Link className={`mdl-layout-title`} to="/">
            <img className={s.title} src={logo} alt={"ITP Thesis 2017"} />
          </Link>
          <div className="mdl-layout-spacer" />

          <div className={s.desktop}>
            <SimpleFilterMenu />
          </div>
          <div className={s.mobile}>
            <IconButton onTouchTap={this.toggleDrawer.bind(this)}><MenuIcon color="#ffffff" /></IconButton>
          </div>

          <Drawer
            docked={false}
            width={300}
            openSecondary={true}
            open={this.state.showDrawer}
            onRequestChange={(showDrawer) => this.setState({showDrawer})}
            containerStyle={{ backgroundColor: '#2b296e' }}
          >
            <SimpleFilterMenu />
          </Drawer>
        </div>
      </header>
    )
  }

}

export default SimpleHeader
