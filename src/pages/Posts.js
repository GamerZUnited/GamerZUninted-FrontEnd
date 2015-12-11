import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pushState } from 'redux-router'
import * as Actions from '../actions/AppActions'
import _ from 'lodash'
import * as Xbox from '../models/xbox';

import '../css/post.scss';

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
    console.log('GamerCARD!!!!')
    // send the message tot the user by following this url
    // https://account.xbox.com/Messages?gamerTag=${gamerTag}



    const postsData = _.map(posts.toJS(), (post, key) => {
      const gamerCardTemplate = Xbox.getGamerCard(post.xuid).then( (gamerCard) => {
        return gamerCard.data;
      });
      var gamerTagMessageLink = `https://account.xbox.com/Messages?gamerTag=${post.gamerTag}`;

      debugger;
      return <div  key={key} style={{color: 'white', borderBottom: '1px solid black'}}>
        <h1>{post.game}</h1>
        <p>
          {post.message}
        </p>
        <p>
          {post.gamerTag}
          <a className="gamerTag-link" href={gamerTagMessageLink} target="_blank">
            Message {post.gamerTag} via Xbox
          </a>
        </p>
        <p>{post.xuid}</p>
      </div>
    })

    const sendMessage= (user) => (event) => {
      console.log('sending message', this.refs.message.value)
      Actions.sendMessage(uid, user, this.refs.message.value)
    }

    const getGamerTag= (gamerTag) => (event) => {
      console.log('Should get gamer tag ', gamerTag);
      Actions.getGamerTag(gamerTag);
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
          <input style={{color:"black"}} type="button" onClick={getGamerTag('Slippingfever29')} value='Get GamerTag'/>
        </div>
      )
      // return(<div  key={key} style={{color: 'white'}}>
      //   <h1>{post.game}</h1>
      //   <h2>{post.message}</h2>
      //   </div>)
    })


    const handleSetPost = () => {
      const {gameName, gameMessage, gamerTag} = this.refs;

      Actions.setPost(uid, gameName.value, gameMessage.value, gamerTag.value);

    }

    return (
      <div style={{width:"300px", border:"1px solid black"}}>
        <input type="text" placeholder="gamerTag" ref="gamerTag" />
        <input type="text" placeholder='game' ref="gameName"/>
        <input type="text" placeholder="message" ref="gameMessage" />
        <input type="button" value="Set Post" onClick={handleSetPost.bind(this)}/>
        {postsData}
        {messagesData}
      </div>
    )

  }
}

export default Posts
