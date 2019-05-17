import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends React.Component {
  state = {
    comics: []
  }

  componentDidMount() {
    const PUBLIC_KEY = 'cb6145334fc2a9ef273d19b9b2f03398'
    AsyncStorage.getItem('accessToken').then((data) => {
      if (data) {
        console.log('has token', data)
        const url = `https://gateway.marvel.com:443/v1/public/comics?apikey=${PUBLIC_KEY}&hash=${data}&ts=1`
        fetch(url, {
          method: 'GET',
        }).then(data => data.json())
        .then(data => {
          console.log(data)
          this.setState({
            comics: data.data.results,
          })
        })
      }
    })
  }

  render() {
    return (
      <ScrollView style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
      }}>
        {this.state.comics.map(comic => (
          <View>
            <Image
              source={{ uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}`}}
              source={{ uri: comic.thumbnail.path + '.' + comic.thumbnail.extension }}
              style={{ width: 200, height: 200 }}
            />
            <Text>{comic.title}</Text>
          </View>
        ))}
      </ScrollView>
    )
  }
}

export default Home