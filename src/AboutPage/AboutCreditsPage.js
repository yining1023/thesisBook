import React from 'react'
import {html} from './credit.md'

export const AboutCreditsPage = () => {
  return (
    <div dangerouslySetInnerHTML={{__html: html}}/>
  )
}
