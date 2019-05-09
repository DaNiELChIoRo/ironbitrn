import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {

  },
  pair: {
    color: "red",
  },
  notPair: {
    color: "green",
  }
})

class Hello extends React.Component {
  render() {
    return (
      <View>
        <Text style={[this.props.number % 2 ? styles.notPair : styles.pair, this.props.manzana]}>
          Hello {this.props.number}
        </Text>
      </View>
    )
  }
}

export default Hello
