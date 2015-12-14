import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pushState } from 'redux-router'
import * as Actions from '../actions/AppActions'
import _ from 'lodash'
import * as Xbox from '../models/xbox';
import DropDown from '../components/dropdown';
import GamerTagField from '../components/newtextfield';
import CommentField from '../components/commentstextfield';
// import DropDown from '../components/dropdown';

import '../css/post.scss';

let injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

let menuItems = [
   { payload: '1', text: 'Madden16' },
   { payload: '2', text: 'Every Night' },
   { payload: '3', text: 'Weeknights' },
   { payload: '4', text: 'Weekends' },
   { payload: '5', text: 'Weekly' },
];



@connect(
  state => ({
    login: state.login,
    messages: state.messages,
    posts: state.posts,
    gamerCardData: state.gamerCardData
  })
)
class Posts extends Component {
  componentWillMount(){
    const {login, posts, dispatch, gamerCardData} = this.props
    console.log('login info', login.toJS())

    if(!login.get('logged')){
      return dispatch(pushState(null, '/login'))
    }

    Actions.listenForPosts(login.toJS().user.uid, dispatch)
    Actions.listenForMessages(login.toJS().user.uid, dispatch)
  }

  render(){
    const {posts, messages, login, gamerCardData} = this.props
    const loginJS = login.toJS();

    const uid = (loginJS.user) ? loginJS.user.uid:null

    console.log(messages.toJS())
    console.log('GamerCARD!!!!')
    // send the message tot the user by following this url
    // https://account.xbox.com/Messages?gamerTag=${gamerTag}



    const postsData = _.map(posts.toJS(), (post, key) => {
      var gamerTagMessageLink = `https://account.xbox.com/Messages?gamerTag=${post.gamerTag}`;

      return <div className="posts">
        <div className="postDiv"  key={key}>
        <h1 className="gameTitle">{post.game}</h1>
        <p className="userMessage">
          {post.message}
        </p>
        <p>
          <a className="gamerTag-link" href={gamerTagMessageLink} target="_blank">
            Message {post.gamerTag} via Xbox
          </a>
        </p>
        <p>{post.xuid}</p>
        <div className="x">
          <p>Tier: {gamerCardData.tier}</p>
          <p>Gamerscore: {gamerCardData.gamerscore}</p>
          <img className="avatarImg" src={gamerCardData.avatarBodyImagePath} />
        </div>
      </div>
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

    const handleNav = (event, selectedIndex, menuItem) => {
      console.log(event, selectedIndex, menuItem);
    }


    const handleSetPost = () => {
      const {gameName, gameMessage, gamerTag} = this.refs;


      console.log('gameName', gameName.getSelectedItem());

      let gamerTagText = gamerTag.getSelectedItem();

      let gameNameText = gameName.getSelectedItem();

      let gameMessageText = gameMessage.getSelectedItem();

      Actions.setPost(uid, gameNameText, gameMessageText, gamerTagText);

    }

    return (
      <div>
        <div>
          <GamerTagField ref="gamerTag"/>
          <br></br>
          <DropDown className="dropdownmenuz" ref="gameName"/>
          <br></br>
          <CommentField ref="gameMessage"/>
        </div>
        <input className="postButton" type="button" value="Set Post" onClick={handleSetPost.bind(this)}/>
        {postsData}
        {messagesData}
      </div>
    )

  }
}

export default Posts
