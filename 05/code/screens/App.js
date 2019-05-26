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
  View,
  ActivityIndicator,
  ImageBackground,
  Platform
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import Field from '../components/field';
import Realm from 'realm';


import Session from '../models/session'
// const realm = Realm.open( { schema: [Session] })

// const accessTokenDBKey = 'accessToken';

type Props = {};
// export default 
class App extends Component<Props> {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    httpError: "",
    isAuthenticated: false,
    isLoading: false,
  }

  componentDidMount() {
    // AsyncStorage.clear()
    // AsyncStorage.getItem(accessTokenDBKey).then((data) => {
    //   if (data) {
    //     console.log('has token', data)
    //     this.setState({
    //       isAuthenticated: data != null
    //     })
    //   }
    // })
  }

  onSubmit = () => {
    this.setState({
      isLoading: true,
    })

    if (!this.state.email) {
      // alert('No hay email')
      this.setState({
        emailError: 'No hay email',
        isLoading: false
      })
      return
    }

    if (!this.state.password) {
      // alert('No hay contraseña')
      this.setState({
        passwordError: 'No hay contraseña',
        isLoading: false
      })
      return
    }

    const url = "http://localhost:3000/token"
    const { email, password } = this.state;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password,
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        isLoading: false,
      })
    

      // try{
        Realm.open({ schema: [Session] }).then (realm => {
          realm.write(() => {
            realm.create('Session', { accessToken: data.accessToken })
            this.props.navigation.navigate('PantallaPrincipal');
          });        
      })
    
      // .catch(e) => {
      //   console.log("Error on cration", e);
      // })
      
    //   AsyncStorage.setItem(accessTokenDBKey, data.accessToken)
    //     .then(() => {
    //       console.log('Ya se guardo el token')
    //       this.props.navigation.navigate('PantallaPrincipal');
    //     })
    //     .catch(error => console.error('Error:', error))
    })
    // .catch(error => {
    //   if (error.error) {
    //     this.setState({
    //       httpError: error.error,
    //     })
    //   }
    //   console.error('Error:', error)
    // })
  }

  render() {
    const buttonText = Platform.OS == 'ios' ? 'iOS Login' : 'Android login'

    return (
      <ImageBackground
        style={styles.container}
        source={require('../gradient.png')}
        imageStyle={{
          resizeMode: 'stretch'
        }}
      >
      <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, padding: 24, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.heading}>{this.state.isAuthenticated ? 'Welcome' : 'Create Account'}</Text>
              <Field
                title="correo"
                description="coloca tu correo personal"
                cuandoCambie={(email) => this.setState({ email })}
                texto={this.state.email}
                error={this.state.emailError}
              />
              <Field
                title="contraseña"
                description="debe ser mayor a X digitos"
                cuandoCambie={(password) => this.setState({ password })}
                texto={this.state.password}
                error={this.state.passwordError}
              />
            </View>

            <Text style={{ color: 'red', fontSize: 30 }}>{this.state.httpError}</Text>
            {this.state.isLoading && <ActivityIndicator size="large" color="#ffffff" />}

            <TouchableOpacity style={styles.submitButton} onPress={this.onSubmit}>
              <Text style={{ fontSize: 18, color: '#000000', textAlign: 'center' }}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const buttonStyles = Platform.select({
  ios: {
    borderRadius: 999
  },
  android: {
    borderRadius: 8
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  submitButton: {
    backgroundColor: '#ffffff',
    padding: 20,
    ...buttonStyles
  }
});




