import React from 'react'
import s from './styles.css'
import {html, title} from './aboutClassindex.md'
import SimpleHeader from '../components/Layout/SimpleHeader'
import {Link, Route} from 'react-router-dom'
import {AboutThesisPage} from './AboutThesisPage'
import {AboutClassPage} from './AboutClassPage'
import {AboutCreditsPage} from './AboutCreditsPage'
import {Switch} from 'react-router-dom'
import {MenuItem, Menu} from 'material-ui'

const style = {
  display: 'inline-block',
  margin: '32px',
}

const itemStyle = {
  color: 'white',
}

export class AboutPage extends React.Component {

  // componentDidMount() {
  //   document.title = title
  // }

  render() {
    const match = this.props.match

    return (
      <div className={s.content}>
        <SimpleHeader />

        <aside>
          <Menu
            style={style}
            selectedMenuItemStyle={{fontWeight: 500}}//doesn't work
          >
            <Link to='/about/itp-thesis' ><MenuItem primaryText="About ITP Thesis" /></Link>
            <Link to='/about/class-2017' ><MenuItem primaryText="Class of 2017" /></Link>
            <Link to='/about/credits' ><MenuItem primaryText="Credits" /></Link>
          </Menu>
        </aside>

        <article className={s.mian}>
          <Switch>
            <Route path={`${match.url}/itp-thesis`} component={AboutThesisPage} />
            <Route path={`${match.url}/class-2017`} component={AboutClassPage} />
            <Route path={`${match.url}/credits`} component={AboutCreditsPage} />
            <Route component={AboutThesisPage} />
          </Switch>
        </article>
      </div>
    )
  }

}
