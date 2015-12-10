import {NEW_POST} from '../constants/ActionTypes'
import {Map,List, fromJS} from 'immutable'

const initialState = Map({})


export default (state = initialState, action) => {
  const {user, post} = action

  switch (action.type) {

    case NEW_POST:
      return state.setIn([user], fromJS(post))

    default:
      return state
  }
}
