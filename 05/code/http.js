import AsyncStorage from '@react-native-community/async-storage';
import Realm from 'realm';
import Session from './models/session';

import Reino from './models/realm'

const PUBLIC_KEY = 'cb6145334fc2a9ef273d19b9b2f03398';

function getCredentials() {
  // return AsyncStorage.getItem('accessToken')

  return new Promise((ok, nah) => {
    Reino.reino(realm => {
      let session = realm.objects('Session')
      if (session.lenght > 0) {
        console.log('has token', session[0])
        ok(session[0].accessToken)
      }
    })
  })

  // return new Promise((ok, nah) => {
  //   Realm.open({ schema: [Session] }).then(realm => {
  //     let session = realm.objects('Session')
  //     if (session.lenght > 0) {
  //       console.log('has token', session[0])
  //       ok(session[0].accessToken)
  //     }
  //   }).catch((e) => {
  //     console.log("Error on creation", e);
  //     nah(e)
  //   })
  // })
}

export default async function httpGet(path) {
  console.log('inside httpGet function')
  let hash = getCredentials()
  const url = `https://gateway.marvel.com:443/${path}?apikey=${PUBLIC_KEY}&hash=${hash}&ts=1`
  console.log(hash)
  let response = await fetch(url, {
    method: 'GET',
  })
  return response.json()
}
