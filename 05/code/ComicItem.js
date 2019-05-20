import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

const COMIC_RATIO = 0.64

export default function(props) {
  const { image, title, onItemPress } = props;
  return (
    <TouchableOpacity onPress={onItemPress}>
      <Image
        source={{ uri: image }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}