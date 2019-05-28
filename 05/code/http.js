// import AsyncStorage from '@react-native-community/async-storage';
import Realm from 'realm';
import Session from './models/session';
// import Comic from './models/comic';

import Reino from './models/realm'

const PUBLIC_KEY = 'cb6145334fc2a9ef273d19b9b2f03398';

function getCredentials() {
  // return AsyncStorage.getItem('accessToken')

  return new Promise((ok, nah) => {
    Reino.get('Session', (data) => {
      ok(data[0].accessToken)
    })
  })

  // return new Promise((ok, nah) => {
  //   Realm.open({ schema: [Session] }).then(realm => {
  //     const session = realm.objects('Session')
  //     console.log('has objs', Array.from(session))
  //     // if (session.lenght > 0) {
  //       console.log('has token', session[0])
  //       ok(session[0].accessToken)
  //     // }
  //     nah()
  //   }).catch((e) => {
  //     console.log("Error on creation", eM);
  //     nah(e)
  //   })
  // })
}

export default async function httpGet(path) {
  console.log('inside httpG et function')
  // try {
    let hash = await getCredentials()
    // console.log(hash)
    const url = `https://gateway.marvel.com:443/${path}?apikey=${PUBLIC_KEY}&hash=${hash}&ts=1`
    console.log({hash})
    let response = await fetch(url, {
      method: 'GET',
    })
    // console.log('response: ', response)    
    return response.json()
  // } catch (e) {
  //   console.log('error while retriving the credentials: ', e)
  // }
}
