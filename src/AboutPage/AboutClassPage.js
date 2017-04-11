import React from 'react'
import {html} from './aboutClassindex.md'

export const AboutClassPage = () => {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}
