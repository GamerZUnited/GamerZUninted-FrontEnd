import React from 'react'
import {connect} from 'react-redux'
import {pushState } from 'redux-router'
import * as Actions from '../actions/AppActions'




@connect(
  state => ({
    login: state.login
  })
)
class Signup extends React.Component {


  render() {
    const {login, dispatch} = this.props

    const handleSignup = (event) => {
      const { password, first_name, email, last_name, age} = this.refs

      dispatch(Actions.signup(first_name.value, last_name.value, email.value,  password.value, age.value))
    }

    return (
      <div className="signUp">
      <form>
        <label>Sign Up Here!</label>
        <input type="text" placeholder="First Name" ref="first_name"/>
        <input type="text" placeholder="last Name" ref="last_name"/>
        <input type="text" placeholder="Email" ref="email"/>
        <input type="password" placeholder="Password" ref="password"/>
        <input type="text" placeholder="GamerTag" ref="age"/>
        <input type="button" value="Sign Up" onClick={handleSignup}/>
      </form>
      </div>
    )
  }
}



export default  Signup
