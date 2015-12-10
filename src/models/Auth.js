
import * as refs from './refs'
import Promise from 'bluebird'

export const  createAccount = (email, password, firstName, lastName, age) => {
  return new Promise( (resolve, reject) => {

    refs.root.createUser({email, password}, (error, userData) => {
      if(error){
        return reject(error)
      }

      refs.users.child(userData.uid).set(
        {firstName, lastName, age}
        ,(error) => {
          if(error){
            return reject(error)
          }
          userData.info={firstName, lastName, age}

          resolve(userData)
        }
      )
    })

  })
}

export const loginWithPassword = (email, password) => {
  return new Promise( (resolve, reject) => {
    refs.root.authWithPassword({email, password}, (error, authData) => {
        if(error){
          return reject(error)
        }

        refs.users.child(authData.uid).on('value', (snap) =>{
          authData.info = snap.val()
          resolve(authData)
        })
    })
  })
}
