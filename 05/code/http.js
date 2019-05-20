import AsyncStorage from '@react-native-community/async-storage';

const PUBLIC_KEY = 'cb6145334fc2a9ef273d19b9b2f03398';

function getCredentials() {
  return AsyncStorage.getItem('accessToken')
}

export default async function httpGet(path) {
  let hash = await getCredentials()
  const url = `https://gateway.marvel.com:443/${path}?apikey=${PUBLIC_KEY}&hash=${hash}&ts=1`
  
  let response = await fetch(url, {
    method: 'GET',
  })
  return response.json()
}
