
import * as refs from './refs'


export const setPost = (uid, game, message, gamerTag, xuid) => {
  console.log('model messages ', gamerTag)
  refs.posts.child(uid).set({game, message, gamerTag, xuid})
}

export const listenForPosts = (cb) => {

  const newData = (snap) => cb(snap.key(), snap.val())
  refs.posts.on('child_added', newData)

  refs.posts.on('child_changed', newData)
}

export const sendMessage = (uid, toUser, message) => {
  refs.messages.child(uid).child(toUser).push(message)
  refs.messages.child(toUser).child(uid).push(message)
}

export const listenForMessages = (uid, cb) => {
  console.log('listening from ', uid)
  refs.messages.child(uid).on('child_added', (fromUser) => {
    console.log(uid, fromUser)
    refs.messages.child(uid).child(fromUser.key()).on('child_added', (message) => {
      cb(fromUser.key(), message.key(), message.val() )
    }
  )
  })
}
