import axios from 'axios'

const URL = 'https://xboxapi.com/v2/'
// https://xboxapi.com/v2/xuid/Slippingfever29
const API_KEY ='2c3726ce63335fd091e3f9fd1c6cc9f09c5134ab'

const get = (url, apiKey, gamertag) => {
  return axios.get(`${url}/xuid/${gamertag}`, {
    headers: {
      'X-Auth': API_KEY
    }
  }).then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });
}

const post = (url, data, apiKey) => {
  return axios.post(URL+url, data, {
    headers: {
      'X-Auth': apiKey,
      'Content-Type': 'application/json'
    }
  })
}



export const getMessages = (apiKey) => {
  //get('accountxuid ',apiKey).then( (result) => {
  //  console.log(result)
  //})

  post('messages', {to:['Slippingfever29'], message:'Testing from our code'}, apiKey).then( (result) => {
   console.log(result)
  })

}
