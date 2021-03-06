import axios from 'axios'

const URL = 'https://xboxapi.com/v2/'
// https://xboxapi.com/v2/xuid/Slippingfever29
const API_KEY ='98b75f4f5b6e68dab6c793268ba97c208285fe9e'

export const getGamerTag = (gamertag) => {
  return axios.get(`${URL}xuid/${gamertag}`, {
    headers: {
      'X-Auth': API_KEY,
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  }).then(function (response) {
    return response;
  })
  .catch(function (response) {
    console.log(response);
  });
}

/*
GET: https://xboxapi.com/v2/${xuid}/gamercard
{
  "gamertag": "PilarLlama88539",
  "name": "",
  "location": "",
  "bio": "",
  "gamerscore": 0,
  "tier": "Silver",
  "motto": "",
  "avatarBodyImagePath": "http://avatar.xboxlive.com/avatar/PilarLlama88539/avatar-body.png",
  "gamerpicSmallImagePath": "",
  "gamerpicLargeImagePath": "",
  "gamerpicSmallSslImagePath": "",
  "gamerpicLargeSslImagePath": "",
  "avatarManifest": ""
}
*/
export const getGamerCard = (xuid) => {
  return axios.get(`${URL}${xuid}/gamercard`, {
    headers: {
      'X-Auth': API_KEY,
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  }).then(function (response) {
    return response;
  })
  .catch(function (response) {
    console.log(response);
  });
}

// A USER WILL ENTER THEIR GAMERTAG
// AFTER THEY'RE ENTERING THE GAMERTAG
// THEY CAN POST MY GROUP with
// - [ ] game name
// - [ ] number of player
// - [ ] description

// const post = (url, data) => {
//   return axios.post(URL+url, data, {
//     headers: {
//       'X-Auth': API_KEY,
//       'Content-Type': 'application/json'
//     }
//   })
// }
//
//
// export const getMessages = () => {
//   //get('accountxuid ',apiKey).then( (result) => {
//   //  console.log(result)
//   //})
//
//   getGamerTag('Slippingfever29');
//
//   post('messages', {to:['Slippingfever29'], message:'Testing from our code'}).then( (result) => {
//    console.log(result)
//   })
//
// }
