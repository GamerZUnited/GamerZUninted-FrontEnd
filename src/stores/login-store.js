import {SET_LOGIN} from '../constants/ActionTypes'
import {Map,List, fromJS} from 'immutable'

const initialState = Map({})


export default (state = initialState, action) => {
  const {logged, user} = action

  switch (action.type) {

    case SET_LOGIN:
      return logged === true
         ?  fromJS({logged, user})
        : fromJS({logged: false, user:null})

    default:
      return state
  }
}
