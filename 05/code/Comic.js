import React from 'react';
import { View, Text, Image } from 'react-native';
import Api from './api';

class Comic extends React.Component {
  state = {
    comic: {
      thumbnail: {
        path: '',
        extension: '',
      }
    }
  }

  componentDidMount() {
    const comicId = this.props.navigation.getParam('comicId')
    Api.getComicById(comicId)
    .then(data => {
      console.log(data.data.results[0])
      this.setState({
        comic: data.data.results[0],
      })
    })
  }

  render() {
    const { comic } = this.state;
  
    return (
      <View>
        <Image
          source={{ uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}`}}
          style={{ width: 200, height: 200 }}
        />
        <Text>{comic.title}</Text>
      </View>
    )
  }
}

export default Comic;