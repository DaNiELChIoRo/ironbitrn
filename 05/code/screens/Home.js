import React from 'react';
import { FlatList, ImageBackground, StyleSheet, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import Api from '../api';
import ComicItem from '../components/ComicItem';
import Realm from 'realm';
import Session from '../models/session'
import Comic from '../models/comic';
import Character from '../models/character';

class Home extends React.Component {
  state = {
    comics: []
  }

  async componentDidMount() {
    this.addUIListeners()
    const data = await Api.getComics()
      console.log(data.data.results)
      this.setState({
        comics: data.data.results,
      })

    Realm.open({ schema: [Session, Comic, Character] })
      .then(realm => {
        realm.write(() => {
          data.data.results.forEach(comic => {                        
            realm.create('Comic', {
              id: comic.id,
              title: comic.title,
              description: comic.description,
              thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            })
          });
        })
      })
      .catch(e => {
          console.log(e)
      })

       
  }

  addUIListeners = () => {
    Realm.open({ schema: [Session, Comic, Character] })
      .then(realm => {
        realm.objects('Comic').addListener(this.updateUI);
       }).catch(e =>{
         console.log(e)
       })
  }

  updateUI = () => {
    console.log('data changed')
    Realm.open({ schema: [Session, Comic, Character] }).then(realm => {
      this.setState({ comics: Array.from(realm.objects('Comic')) })
    })
  }

  componentWillUnmount(){
    Realm.open({ schema: [Session, comic, Character] })
    .then(realm => {
      realm.removeAllListeners()
    })
  }


  showComicDetails = (comic) => () => {
    this.props.navigation.push('Comic', {
      comicId: comic.id,
    });
  }

  render() {    
    const w = Dimensions.get('window').width
    const {comics} = this.state
    return (
      <ImageBackground
        style={styles.container}
        source={require('../mvgradient.png')}
        imageStyle={{
          resizeMode: 'stretch'
        }}
      >

        <FlatList
          data={comics}
          numColumns={2}
          renderItem={({ item }) => (
            <ComicItem
              onItemPress={this.showComicDetails(item)}
              title={item.title}
              style={styles.MainContainer}
              image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              width={w / 2}
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