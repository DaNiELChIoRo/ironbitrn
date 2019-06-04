import React from 'react';
import {
    View,
    ImageBackground,
    FlatList,
    StyleSheet
} from 'react-native';
import Api from '../api';
import ComicItem from '../components/ComicItem';
import Reino from '../models/realm';
import Realm from 'realm';
import Session from '../models/session'
import Comic from '../models/comic';
import Character from '../models/character';

class VR extends React.Component {

    state = {
        comics: []
    }

    async componentDidMount() {
        this.addUIListeners()
        Api.getComics()
            .then(data => {
                console.log(data.data.results)
                data.data.results.forEach(comic => {
                    Reino.add('Comic', {
                        id: comic.id,
                        title: comic.title,
                        description: comic.description,
                        thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
                    })
                })
            })
    }

    addUIListeners = () => {
        Realm.open({ schema: [Session, Comic, Character] })
            .then(realm => {
                realm.objects('Comic').addListener(this.updateUI);
            }).catch(e => {
                console.log(e)
            })
    }

    updateUI = () => {
        console.log('data changed')
        Realm.open({ schema: [Session, Comic, Character] }).then(realm => {
            this.setState({ comics: Array.from(realm.objects('Comic')) })
            console.log(Array.from(realm.objects('Comic')))
        })
    }

    render() {
        const { comics } = this.state
        return (
            // <View>
                <ImageBackground
                    height={40}
                    width={100}
                    style={styles.container}
                    source={require('../mvgradient.png')}
                    imageStyle={{
                        resizeMode: 'stretch'
                    }}>
                    <FlatList>
                        data={comics}
                        horizontal
                    renderItem={({ item }) => (
                            <ComicItem
                                onItemPress={this.showComicDetails(item)}
                                title={item.title}
                                style={styles.MainContainer}
                                image={item.thumbnail}
                                width={w / 2}
                            />
                        )}
                    </FlatList>
                </ImageBackground>
            // </View>
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

export default VR