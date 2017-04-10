import React from 'react'
import {Link} from 'react-router-dom'
import s from './styles.css'
import SimpleHeader from '../components/Layout/SimpleHeader'

export class ErrorPage extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  }

  componentDidMount() {
    document.title = this.props.error && this.props.error.status === 404 ?
      'Page Not Found' : 'Error'
  }

  goBack(event) {
    event.preventDefault()
    this.props.history.goBack()
  }

  render() {
    if (this.props.error) console.error(this.props.error) // eslint-disable-line no-console

    const [code, title] = this.props.error && this.props.error.status === 404 ?
      ['404', 'Page not found'] :
      ['Error', 'Oops, something went wrong']

    return (
      <div className={s.container}>
        <SimpleHeader />
        <main className={s.content}>
          <h1 className={s.code}>{code}</h1>
          <p className={s.title}>{title}</p>
          {code === '404' &&
            <p className={s.text}>
              The page you&apos;re looking for does not exist or an another error occurred.
            </p>
          }
          <p className={s.text}>
            <a href="/" onClick={this.goBack.bind(this)}>Go back</a>, or head over to the&nbsp;
            <Link to="/">home page</Link> to choose a new direction.
          </p>
        </main>
      </div>
    )
  }

}
