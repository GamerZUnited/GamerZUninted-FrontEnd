
import {SET_LOGIN, NEW_POST, NEW_MESSAGE, GET_GAMERCARD} from '../constants/ActionTypes'
import axios from 'axios'
import {pushState } from 'redux-router'

import {loginWithPassword, createAccount} from '../models/Auth'
import * as Messages from '../models/Messages'
import * as Xbox from '../models/xbox'

const URL = 'https://glacial-bayou-9575.herokuapp.com'

export const signup = (firstName, lastName, email,  password, age) => dispatch => {


  createAccount(email, password, firstName, lastName, age).then( (data) => {
    console.log('signup wioth', data)
  })

  // const data = {
  //   firstName, lastName, email, password, age
  // }
  // axios.post(URL+'/signup', data).then( result => {
  //   console.log('SIGNUP', result)
  //   dispatch(pushState(null, '/login'))
  // }).catch(error => {
  //   console.log(error);
  //   dispatch({
  //     type: SET_LOGIN,
  //     logged: false,
  //     user: null
  //   })
  // })

}

export const login = (email, password) => dispatch => {
  loginWithPassword(email, password).then( (userData) => {
    console.log('logged in with ', userData)
    dispatch({
        type: SET_LOGIN,
        logged: true,
        user: userData
      })
  })
  .catch( (error) => {
    console.log('error when login',error)
  })

  // const data = {username, password}
  //
  // axios.post(URL+'/login', data).then( result => {
  //   console.log('login', result)
  //   dispatch({
  //     type: SET_LOGIN,
  //     logged: true,
  //     user: result
  //   })
  // }).catch(error => {
  //   console.log(error);
  //   dispatch({
  //     type: SET_LOGIN,
  //     logged: false,
  //     user: null
  //   })
  // })
}

export const setPost = (uid, game, message, gamerTag) => {
  console.log('gamerTag action ', gamerTag, 'uid', uid);

  //get the gamertag id before posting it to firebase
  // gamerTag: Slippingfever29
  Xbox.getGamerTag(gamerTag).then( (gamerTagData) => {
    Messages.setPost(uid, game, message, gamerTag, gamerTagData.data.xuid)
    // dispatch({
    //     type: SET_LOGIN,
    //     logged: true,
    //     user: userData
    //   })
  });

}

const gamerCardData = {};

export const listenForPosts = (uid, dispatch) => {

  Messages.listenForPosts( (user, post) => {
    dispatch({
      type: NEW_POST,
      user, post
    });
    Xbox.getGamerCard(post.xuid).then( (gamerCard) => {
      // var gamerCardData = gamerCard.data;
      console.log('======!!!!!!|||||||| >>>>>gamercard:', gamerCard.data);
      gamerCardData[gamerCard.data.gamertag] = gamerCard.data;
      dispatch({
        type: GET_GAMERCARD,
        gamerCardData
      })
    });
  })
}

export const listenForMessages = (uid, dispatch) => {

  Messages.listenForMessages( uid, (fromUser, msgid, message) => {
    dispatch({
      type: NEW_MESSAGE,
      fromUser, msgid, message
    })
  })
}

export const sendMessage = (uid, toUser, message) => {
  Messages.sendMessage(uid, toUser, message)
}

export const getGamerTag = (gamerTag) => {
  Xbox.getGamerTag(gamerTag).then( (gamerTagData) => {

    return gamerTagData.data.xuid;
    // dispatch({
    //     type: SET_LOGIN,
    //     logged: true,
    //     user: userData
    //   })
  });
}

export const load = () => {
  return dispatch => {
    axios.get(URL).then( response => {
      response.data.map( item => {
        dispatch(itemSet(item.id, item.data))
      })
    })
    }

}

export const itemAdded = (id, data) => ({
  type: ADD_ITEM,
  id, data
})

export const itemDeleted = (id) => ({
  type: DELETE_ITEM,
  id
})

export const itemSet = (id, data) => ({
  type: SET_ITEM,
  id, data
})
