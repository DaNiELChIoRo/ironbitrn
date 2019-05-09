/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Field from './field';

type Props = {};
export default class App extends Component<Props> {
  state = {
    email: "",
    password: "",
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, padding: 24, flexDirection: 'column', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: 'white', fontSize: 24 }}>Create Account {this.state.email}</Text>
            <Field
              title="correo"
              description="coloca tu correo personal"
              cuandoCambie={(email) => this.setState({ email })}
              texto={this.state.email}
            />
            <Field
              title="contraseña"
              description="debe ser mayor a X digitos"
              cuandoCambie={(password) => this.setState({ password })}
              texto={this.state.password}
            />
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={{ color: '#000000', textAlign: 'center' }}>{this.state.password}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  submitButton: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 999,
  }
});
