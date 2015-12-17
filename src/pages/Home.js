import React from 'react'
import {connect} from 'react-redux'
import {pushState } from 'redux-router'
import * as Actions from '../actions/AppActions'

import TestComponent from '../components/TestComponent';

@connect(
  state => ({
    login: state.login
  })
)
class Home extends React.Component {

  componentWillReceiveProps(nextProps){
    const {dispatch} = this.props

    if(nextProps.login.toJS().logged){
      dispatch(pushState(null,'/posts'))
    }

  }

  render() {
    const {login, dispatch} = this.props

    const handleLogin = (event) => {
      const {email, password} = this.refs

      dispatch(Actions.login(email.value, password.value))
    }

    const gotoSignUp = (event) => {
      dispatch(pushState(null,'/signup'))
    }



    return (
      <div>
        <div>
          <form>
            <label>Welcome to GamerZUnited</label>
            <input type="text" placeholder="email" ref="email" required></input>
            <input type="password" placeholder="password" ref="password" required></input>
            <input type="button" value="Log In" onClick={handleLogin}/>
            <input type="button" value="Sign Up" onClick={gotoSignUp}/>
          </form>
        </div>
      </div>
    )
  }
}

export default Home
