import React from 'react'
import ReactDOM from 'react-dom'
// vr ReactVR
// mobile ReactNative
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

ReactDOM.render(
  /* Component JSX */
  <Provider store={store}>
    <App />
  </Provider>,
  /* target Element */
  document.getElementById('app')
)
