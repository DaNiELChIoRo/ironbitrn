import React from 'react';
import { FlatList, Text, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import Avatar from '../components/avatar';
import Api from '../api';

class Comic extends React.Component {
  state = {
    comic: {
      thumbnail: {
        path: '',
        extension: '',
      }
    }
  }

  async componentDidMount() {
    const comicId = this.props.navigation.getParam('comicId')
    Api.getComicById(comicId)
      .then(data => {
        console.log(data.data.results[0])
        this.setState({
          comic: data.data.results[0],
        })
      })
    const data = await Api.getComicCharacters(comicId)
    const heros = data.data.results
    console.log({ heros });
    this.setState({ heros })

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
          source={{ uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}` }}
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
          contentContainerStyle={{marginTop: 10, marginHorizontal: 16}}
          renderItem={({ item }) => (
            <Avatar
              photo={ {uri: `${item.thumbnail.path}.${item.thumbnail.extension}`}}
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

export default Comic;