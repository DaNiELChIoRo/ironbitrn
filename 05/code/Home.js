import React from 'react';
import { FlatList, TouchableOpacity, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Api from './api';
import ComicItem from './ComicItem';

class Home extends React.Component {
  state = {
    comics: []
  }

  componentDidMount() {
    Api.getComics()
    .then(data => {
      console.log(data)
      this.setState({
        comics: data.data.results,
      })
    })
  }

  showComicDetails = (comic) => () => {
    this.props.navigation.push('Comic', {
      comicId: comic.id,
    });
  }

  render() {
    return (
      <FlatList
        data={this.state.comics}
        renderItem={({ item }) => (
          <ComicItem
            onItemPress={this.showComicDetails(item)}
            title={item.title}
            image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          />
        )}
      />
    )
  }
}

export default Home