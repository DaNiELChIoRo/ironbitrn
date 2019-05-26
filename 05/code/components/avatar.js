import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Avatar = ({photo, heroName, width, hacerAlgo}) => (
    <TouchableOpacity style={[styles.container, { width }]} onPress={hacerAlgo} >
        <Image style={styles.avatar} source={photo}></Image>
        <Text style={styles.title}>{heroName}</Text>
    </TouchableOpacity>
);



const styles = StyleSheet.create({

    container:{
        alignItems: 'center',        
    },

    avatar:{
        borderRadius: 36,
        height: 72,
        width: 72
    },

    title:{
        marginTop: 8,
        color: 'white',
        fontSize: 18
    }

});

export default Avatar;