import axios from 'axios'

const URL = 'https://xboxapi.com/v2/'
// https://xboxapi.com/v2/xuid/Slippingfever29
const API_KEY ='2c3726ce63335fd091e3f9fd1c6cc9f09c5134ab'

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

// A USER WILL ENTER THEIR GAMERTAG
// AFTER THEY'RE ENTERING THE GAMERTAG
// THEY CAN POST MY GROUP with
// - [ ] game name
// - [ ] number of player
// - [ ] description

const post = (url, data) => {
  return axios.post(URL+url, data, {
    headers: {
      'X-Auth': API_KEY,
      'Content-Type': 'application/json'
    }
  })
}


export const getMessages = () => {
  //get('accountxuid ',apiKey).then( (result) => {
  //  console.log(result)
  //})

  getGamerTag('Slippingfever29');

  post('messages', {to:['Slippingfever29'], message:'Testing from our code'}).then( (result) => {
   console.log(result)
  })

}
