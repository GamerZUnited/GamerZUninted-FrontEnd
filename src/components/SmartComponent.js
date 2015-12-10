import React from 'react'
import {connect} from 'react-redux'
import {pushState } from 'redux-router'


class SmartComponent extends React.Component {


  render() {
    const {dispatch, pushState, simpleStore, immutableStore} = this.props;

    const handleRedirect = () => {
      console.log(this.props.location)
      dispatch(pushState(null, '/redirected'))
    }


    return (
      <div>
        <h1>Home page component</h1>
        <button onClick={handleRedirect}>Redirect</button>
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    simpleStore: state.simple,
    immutableStore: state.immutable,
    location: state.router.location
  }
}


export default connect(mapStateToProps, {pushState})(SmartComponent)
