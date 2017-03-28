import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import FastClick from 'fastclick'
import {App} from './App'
import {AppContainer} from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'

// let routes = require('./routes.json').default // Loaded with utils/routes-loader.js

const container = document.getElementById('container')

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    container
  )

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
// history.listen(render)

injectTapEventPlugin()
render(App)

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body)

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
