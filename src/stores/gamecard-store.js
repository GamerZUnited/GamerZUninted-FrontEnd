import {GET_GAMERCARD} from '../constants/ActionTypes'
import {Map,List, fromJS} from 'immutable'

const initialState = Map({})


export default (state = initialState, action) => {
  const {gamerCardData} = action

  switch (action.type) {

    case GET_GAMERCARD:
      return gamerCardData

    default:
      return state
  }
}
