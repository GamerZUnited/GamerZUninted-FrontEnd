import styles from './css/style.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import AppCanvas from 'material-ui/lib/app-canvas'
import createBrowserHistory from 'history/lib/createBrowserHistory'


import App from './pages/App'

import configureStore from './stores'

const store = configureStore()

const targetEl = document.getElementById('root')

const node =
<App  store={store}/>
ReactDOM.render(node, targetEl)
