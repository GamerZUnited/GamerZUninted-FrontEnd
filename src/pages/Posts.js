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

import TopNav from '../components/topnav';
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
      var gameBuyLink = `http://www.amazon.com/s/ref=nb_sb_ss_c_0_12/192-1526979-8063758?url=search-alias%3Daps&field-keywords=xbox+one+${post.game}`;
      var gameTrailer = `https://www.youtube.com/results?search_query=${post.game}+trailer`;
      var addFriend = `https://account.xbox.com/en-US/Profile?GamerTag=${post.gamerTag}`;
      var gameReview = `http://www.gamesradar.com/${post.game}-review/`

      console.log('GGGGGGGGGGG ===>', gamerCardData);
      var gamerCard = gamerCardData[post.gamerTag];

      if (!gamerCard) {
        gamerCard = {tier: '', gamerscore: '', avatarBodyImagePath: ''};
      }

      return <div className="postCards">
      <Card initiallyExpanded={false}>
  <CardHeader
    title={post.game}
    subtitle={post.gamerTag}
    avatar={gamerProfilePic}
    actAsExpander={true}
    showExpandableButton={true}
    className="posts">
  </CardHeader>
  <CardText expandable={true}>
    {post.message}
  </CardText>
  <CardActions expandable={true}>
    <FlatButton
      target="_blank"
      className="oddButton"
      label="MESSAGE via XBOX"
      linkButton={true}
      secondary={true}
      href={gamerTagMessageLink}/>
    <FlatButton
      target="_blank"
      className="evenButton"
      label="Add Friend on Xbox One"
      linkButton={true}
      primary={true}
      href={addFriend}/>
    <FlatButton
      target="_blank"
      className="oddButton"
      label="PURCHASE GAME @ Amazon"
      linkButton={true}
      primary={true}
      href={gameBuyLink}/>
    <FlatButton
      target="_blank"
      className="evenButton"
      label="GAME TRAILER"
      linkButton={true}
      primary={true}
      href={gameTrailer}/>
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
      <div className="overallApp">
        <TopNav></TopNav>
        <Card initiallyExpanded={true}>
          <CardHeader
            title="Find A Group"
            actAsExpander={true}
            showExpandableButton={true}
            avatar={<Avatar>LF</Avatar>}
            className="titleheader"
            style={{
                  width: '75%',
                  margin: '0 auto',
                }}>
          </CardHeader>
            <CardActions expandable={true} className="inputCard">
              <GamerTagField className="gamerTaginput" ref="gamerTag"/>
              <br></br>
              <DropDown className="dropdownele" ref="gameName"/>
              <br></br>
              <CommentField className="gamerCommentinput" ref="gameMessage"/>
              <br></br>
            <FlatButton className="submitbutton" label="SUBMIT" onClick={handleSetPost.bind(this)}/>
              <br></br>
            </CardActions>
        </Card>
      {postsData}
      {messagesData}
      </div>
    )

  }
}

export default Posts
