import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import login from './login-store'
import posts from './posts-store'
import gamerCardData from './gamecard-store'
import messages from './messages-store'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'
import routes from '../routes/index.js'

const rootReducer = combineReducers({
  login, posts, messages, gamerCardData,
  router: routerStateReducer
})

const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    reduxReactRouter({
      routes,
      createHistory
    })
)(createStore);


export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  return store
}
