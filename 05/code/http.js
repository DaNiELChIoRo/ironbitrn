import AsyncStorage from '@react-native-community/async-storage';
import Realm from 'realm';
import Session from './models/Session';
// import console = require('console');

const PUBLIC_KEY = 'cb6145334fc2a9ef273d19b9b2f03398';

function getCredentials() {
  // return AsyncStorage.getItem('accessToken')
  return new Promise((ok, nah) => {
    Realm.open({ schema: [Session] }).then (realm => {
      let session = realm.objets('Session')
        if (session.lenght > 0) {
          console.log('has token', session[0])
          ok(session[0].accessToken)
        } 
    })
  })
}

export default async function httpGet(path) {
  let hash = await getCredentials()
  const url = `https://gateway.marvel.com:443/${path}?apikey=${PUBLIC_KEY}&hash=${hash}&ts=1`
  
  let response = await fetch(url, {
    method: 'GET',
  })
  return response.json()
}
