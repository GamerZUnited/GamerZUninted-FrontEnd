import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pushState } from 'redux-router'
import * as Actions from '../actions/AppActions'
import _ from 'lodash'
import * as Xbox from '../models/xbox';
import DropDown from '../components/dropdown';
import GamerTagField from '../components/newtextfield';
import CommentField from '../components/commentstextfield';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardExpandable from 'material-ui/lib/card/card-expandable';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import Avatar from 'material-ui/lib/avatar';
// import DropDown from '../components/dropdown';

import '../css/post.scss';

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
      var gamerProfilePic = `http://avatar.xboxlive.com/avatar/${post.gamerTag}/avatarpic-l.png`;

      console.log('GGGGGGGGGGG ===>', gamerCardData);
      var gamerCard = gamerCardData[post.gamerTag];

      if (!gamerCard) {
        gamerCard = {tier: '', gamerscore: '', avatarBodyImagePath: ''};
      }

      return <div>
      <Card initiallyExpanded={true}>
  <CardHeader
    title={post.game}
    subtitle={post.gamerTag}
    avatar={gamerProfilePic}
    actAsExpander={true}
    showExpandableButton={true}>
  </CardHeader>
  <CardText expandable={true}>
    {post.message}
  </CardText>
  <CardActions expandable={true}>
    <FlatButton label="MESSAGE via XBOX"
      linkButton={true}
      secondary={true}
      href={gamerTagMessageLink}/>
  </CardActions>
</Card>
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
        <div className="inputForm">
          <div>
            <GamerTagField ref="gamerTag"/>
            <br></br>
            <DropDown className="dropdownmenuz" ref="gameName"/>
            <br></br>
            <CommentField ref="gameMessage"/>
          </div>
          <FlatButton label="SUBMIT" onClick={handleSetPost.bind(this)}/>
        </div>
      {postsData}
      {messagesData}
      </div>
    )

  }
}

export default Posts
