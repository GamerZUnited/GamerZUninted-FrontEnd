import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pushState } from 'redux-router'
import * as Actions from '../actions/AppActions'
import _ from 'lodash'

@connect(
  state => ({
    login: state.login,
    messages: state.messages,
    posts: state.posts
  })
)
class Posts extends Component {
  componentWillMount(){
    const {login, posts, dispatch} = this.props
    console.log('login info', login.toJS())

    if(!login.get('logged')){
      return dispatch(pushState(null, '/login'))
    }

    Actions.listenForPosts(login.toJS().user.uid, dispatch)
    Actions.listenForMessages(login.toJS().user.uid, dispatch)
  }

  render(){
    const {posts, messages, login} = this.props
    const loginJS = login.toJS()

    const uid = (loginJS.user) ? loginJS.user.uid:null

    console.log(messages.toJS())

    const postsData = _.map(posts.toJS(), (post, key) => {
      return(<div  key={key} style={{color: 'white'}}>
        <h1>{post.game}</h1>
        <h2>{post.message}</h2>
        </div>)
    })

    const sendMessage= (user) => (event) => {
      console.log('sending message', this.refs.message.value)
      Actions.sendMessage(uid, user, this.refs.message.value)
    }

    const messagesData = _.map(messages.toJS(), ( userMessages, user) => {
      console.log('--', user, userMessages)
      const userMessagesData =  _.map(userMessages, (msg, id) => {
          console.log(user, id, msg)
        return (
          <li key={id}>{msg}</li>
        )
      })

      return (
        <div style={{color:"white"}} key={user}>
        <ul>{userMessagesData}</ul>

          <input type="text" ref="message" style={{color: 'black'}}/>
          <input style={{color:"black"}} type="button" onClick={sendMessage(user)} value='Send'/>
        </div>
      )
      // return(<div  key={key} style={{color: 'white'}}>
      //   <h1>{post.game}</h1>
      //   <h2>{post.message}</h2>
      //   </div>)
    })


    const handleSetPost = () => {
      const {game, message} = this.refs
      Actions.setPost(uid, game.value, message.value)

    }

    return (
      <div style={{width:"300px", border:"1px solid black"}}>
        <input type="text" placeholder='game' ref="game"/>
        <input type="text" placeholder="message" ref="message" />
        <input type="button" value="Set Post" onClick={handleSetPost}/>
        {postsData}
        {messagesData}
      </div>
    )

  }
}

export default Posts
