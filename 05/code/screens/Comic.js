import React from 'react';
import { FlatList, Text, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import Avatar from '../components/avatar';
import Api from '../api';
import Reino from '../models/realm';
import Realm from 'realm';
import Character from '../models/character';
import Session from '../models/character';
import Comic from '../models/character';

class ComicScreen extends React.Component {
  state = {
    comic: {
      title: '',
      thumbnail: ''
    }
  }

  async componentDidMount() {
    const comicId = this.props.navigation.getParam('comicId')
    console.log(comicId);
    Reino.getById('Comic', comicId ,(comic) => {
      console.log('Comic id is: ', Array.from(comic))
      this.setState({
        comic: Array.from(comic)[0],
      })
    });
  }

  handleHeroPress = (character) => () => {
    console.log('handleHeroPress: ' + character)
    this.props.navigation.push('Character', {
      characterId: character,
      title: character.name
    })
  }

  render() {
    const { comic, heros } = this.state;
    return (
      // <View style={{ alignItems: 'center', flex: 1}}>
      <ImageBackground
        style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}
        source={require('../mvgradient.png')}
        imageStyle={{
          resizeMode: 'stretch'
        }}
      >
        <Image
          source={{ uri: comic.thumbnail }}
          style={{ width: 200, height: 200, borderRadius: 100 }}
        />
        <Text
          style={styles.titleStyle} >
          {comic.title}
        </Text>
        <Text
          style={styles.descriptionStyle} >
          {comic.description}
        </Text>
        <FlatList
          data={heros}
          horizontal
          contentContainerStyle={{ marginTop: 10, marginHorizontal: 16 }}
          renderItem={({ item }) => (
            <Avatar
              // photo={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }}
              photo={{ uri: item.thumbnail }}
              heroName={item.name}
              width={100}
              hacerAlgo={this.handleHeroPress(item.id)}
            />
          )}
        >
        </FlatList>
      </ImageBackground>


      // </View>

    )
  }
}

const { ancho } = Dimensions.get('window').width;

const styles = StyleSheet.create({

  descriptionStyle: {
    color: 'white',
    textAlign: 'center',
    padding: 15,
    marginBottom: 10
  },

  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    width: ancho / 2,
    height: 200
  }

});

export default ComicScreen;