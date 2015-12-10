import React from 'react'
import {connect} from 'react-redux'
import {pushState } from 'redux-router'

import TestComponent from '../components/TestComponent'

// @connect(
//   state => ({
//     login: state.login,
//     state: state
//   })
// )

class Home extends React.Component {

  componentDidMount() {
    const {login, dispatch, state} = this.props

    if(!login.loggedin){
      dispatch(pushState(null, '/login' ))
    }
  }
  render() {
    const {login, dispatch} = this.props
    return (
      <div>
        <TestComponent />
      </div>
    )
  }

}



export default  Home
