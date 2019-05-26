
import React from 'react';
import { Image, Dimensions, TouchableOpacity, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import Api from '../api';
import ComicItem from '../components/ComicItem';

class Character extends React.Component {

    // static navigationOptions = {
    //     title: this.state.hero.name
    //   };

    state = {
        hero: {
            name: '',
            description: '',
            thumbnail: {
                path: '',
                extension: '',
            }
            
        }
    };

    async componentDidMount() {
        const heroId = this.props.navigation.getParam('characterId')
        Api.getHeroById(heroId)
            .then(data => {
                console.log(data.data.results[0])
                this.setState({
                    hero: data.data.results[0]
                })
            })
        // const data = await Api.getHeroById(heroId)
        // const hero = data.data.results[0]
        // console.log({ hero })
        // this.setState({ hero })

        Api.getComicByHeroId(heroId)
            .then(data => {
                console.log(data.data.results)
                this.setState({
                    comic: data.data.results
                })
            })
        // const data1 = await Api.getComicByHeroId(heroId)
        // const comic = data1.data.results
        // console.log(comic)
        // this.setState({comic})
    }

    showComicDetails = (comic) => () => {
        this.props.navigation.push('Comic', {
            comicId: comic.id,
        });
    }

    render() {
        const { hero, comic } = this.state;
        const ancho = Dimensions.get('window').width;
        // console.log('hero 1st comics ' + comic.title)
        return (
            <ImageBackground
                style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}
                source={require('../mvgradient.png')}
                imageStyle={{
                    resizeMode: 'stretch'
                }}>
                <Image style={styles.thumbnail_image} source={{ uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}` }}></Image>
                <Text style={styles.titleStyle}>{hero.name}</Text>
                <Text style={styles.descriptionStyle}>{hero.description}</Text>
                <FlatList
                    data={comic}
                    numColumns={2}
                    contentContainerStyle={{ marginTop: 10, marginHorizontal: 16 }}
                    renderItem={({ item }) => (
                        <ComicItem
                            onItemPress={this.showComicDetails(item)}
                            title={item.title}
                            style={styles.MainContainer}
                            image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                            width={Dimensions.get('window').width / 2}
                        />
                    )}
                >
                </FlatList>
            </ImageBackground >
        )
    }
}

const styles = StyleSheet.create({

    thumbnail_image: {
        paddingTop: 15,
        height: 128,
        width: 128,
        borderRadius: 64,
    },

    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        padding: 15,
        paddingTop: 20
    },

    descriptionStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        padding: 15
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,

    },
    
})

export default Character;