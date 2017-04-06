import React, {Component} from 'react'
import {Provider} from 'react-redux'
import Root from './Root'
import {store} from './redux/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Root />
        </Provider>
      </MuiThemeProvider>
    )
  }
}
