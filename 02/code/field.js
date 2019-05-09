import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

class Field extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <View>
        <Text style={[styles.text, styles.title]}>{this.props.title}</Text>
        <TextInput
          style={{ height: 40, backgroundColor: 'rgba(255,255,255,0.8)' }}
          onChangeText={this.props.cuandoCambie}
          // onChangeText={(manzana) => this.props.cuandoCambie(manzana)}
          value={this.props.texto}
        />
        <Text style={[styles.text, styles.description]}>{this.props.descriptions}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24
  },
  description: {
    fontSize: 18
  },
  text: {
    fontFamily: 'Menlo',
    color: '#ffffff'
  }
})

export default Field
