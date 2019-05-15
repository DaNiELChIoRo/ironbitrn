import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

class Field extends React.Component {
  render() {
    return (
      <View>
        <Text style={[styles.text, styles.title]}>{this.props.title}</Text>
        <TextInput
          style={[styles.field, this.props.error && styles.fieldError]}
          onChangeText={this.props.cuandoCambie}
          value={this.props.texto}
        />
        <Text style={[styles.text, styles.description]}>{this.props.description}</Text>
        <Text style={[styles.text, styles.error]}>{this.props.error}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 4,
    color: "#000000",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  title: {
    fontSize: 18
  },
  description: {
    fontSize: 16
  },
  error: {
    color: 'red'
  },
  fieldError: {
    borderColor: 'red',
  },
  text: {
    fontFamily: 'Menlo',
    color: '#ffffff'
  }
})

export default Field
