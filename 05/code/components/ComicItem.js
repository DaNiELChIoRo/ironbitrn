import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';

const COMIC_RATIO = 0.64

export default function(props) {
  const { image, title, onItemPress, width } = props;
  return (
    <TouchableOpacity onPress={onItemPress} style={styles.butonStyle}>
      <Image
        source={{ uri: image }}
        style={ [styles.imageStyle,{ width: width - 20, height: width / COMIC_RATIO }]}
      />
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  butonStyle: {
    width: 170,
    alignItems: 'center', 
    padding: 20
  },

  imageStyle:{
    flex: 1,
    justifyContent: 'center'
  },

  textStyle: {
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
    color: 'white'    
  }

});