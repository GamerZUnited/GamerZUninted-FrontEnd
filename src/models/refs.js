import Firebase from 'firebase'

export const root = new Firebase('https://glaring-inferno-1106.firebaseio.com')

export const users = root.child('users')
export const posts = root.child('posts')
export const messages = root.child('messages')
