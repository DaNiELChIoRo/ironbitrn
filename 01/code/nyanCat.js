import React from 'react'
import { Image } from 'react-native'

const image = {
    url: "https://i.kym-cdn.com/entries/icons/mobile/000/005/608/nyan-cat-01-625x450.jpg"
}

class Nyan extends React.Component {
  render() {
    return <Image source={image} style={{ width: 100, height: 100 }} />
  }
}

export default Nyan
