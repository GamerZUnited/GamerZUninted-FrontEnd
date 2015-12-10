import {NEW_MESSAGE} from '../constants/ActionTypes'
import {Map,List, fromJS} from 'immutable'

const initialState = Map({})


export default (state = initialState, action) => {
  const {fromUser, msgid, message} = action

  switch (action.type) {

    case NEW_MESSAGE:
      return state.setIn([fromUser, msgid], message)

    default:
      return state
  }
}
