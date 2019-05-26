import React from 'react';
import { FlatList, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../api';
import ComicItem from '../components/ComicItem';

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

      <ImageBackground
        style={styles.container}
        source={require('../mvgradient.png')}
        imageStyle={{
          resizeMode: 'stretch'
        }}
        >

      <FlatList
        data={this.state.comics}
        numColumns={2}
        renderItem={({ item }) => (
          <ComicItem
            onItemPress={this.showComicDetails(item)}
            title={item.title}
            style={styles.MainContainer}
            image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
            width={ Dimensions.get('window').width / 2 }
          />
        )}
      />
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  MainContainer: {
    justifyContent: 'center',
    flex: 1,

  }

});

export default Home