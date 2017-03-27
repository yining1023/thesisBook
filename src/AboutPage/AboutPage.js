import React from 'react'
import s from './styles.css'
import {html, title} from './index.md'

export class AboutPage extends React.Component {

  componentDidMount() {
    document.title = title
  }

  render() {
    return (
      <div className={s.content}>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    )
  }

}
