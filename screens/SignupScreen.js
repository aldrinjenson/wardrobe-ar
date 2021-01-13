import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  TouchableOpacity, Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      disabled: false,
      form: false,
      form1: false,
      form2: false,
      passf: false,
    };
    this.login = this.login.bind(this);
  }
  async login() {
      // try {
      //   const jsonValue = JSON.stringify({})
      //   await AsyncStorage.setItem('@storage_Key', jsonValue);
      //  
      // } catch (e) {
      //   console.log(e);
      // }
      this.props.navigation.navigate('HomeStack');

  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <View>
        <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('../assets/user.png')}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({name})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require('../assets/email.png')}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={email => this.setState({email})}
            />
          </View>
          {this.state.form ? (
            <View
              style={{
                alignItems: 'flex-end',
                marginBottom: -15,
                marginRight: 5,
              }}>
              <Text style={styles.toast}>invalid email</Text>
            </View>
          ) : null}
          <View style={styles.inputContainer}>
            <Image
                style={styles.inputIcon}
                source={require('../assets/password.png')}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({password})}
            />
          </View>
          {this.state.passf ? (
            <View
              style={{alignItems: 'flex-end', marginBottom: 5, marginRight: 5}}>
              <Text style={styles.toast}>password is required</Text>
            </View>
          ) : null}
          <View
            style={{
              alignItems: 'flex-end',

              paddingBottom: 20,
              marginRight: 12,
              marginTop: 5,
            }}>
           
          </View>
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={this.login}
          disabled={this.state.disabled}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableHighlight>
        {this.state.form1 ? (
          <View style={{alignItems: 'center', marginBottom: 5}}>
            <Text style={styles.toast}>Incorrect email/password</Text>
          </View>
        ) : null}
        {this.state.form2 ? (
          <View style={{alignItems: 'center', marginBottom: 5}}>
            <Text style={styles.toast}>
              Error establishing connection with server
            </Text>
          </View>
        ) : null}
        <ActivityIndicator size="large" animating={this.state.loading} />
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: '#21243d',
              fontWeight: '900',
              fontSize: 14,
              letterSpacing: 0.8,
            }}>
          Already have an Account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text
              style={{
                color: 'black',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1F2Fb',
  },
  inputContainer: {
    backgroundColor: '#fff3ff',
    borderRadius: 17,
    width: 250,
    height: 43,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  inputs: {
    width: 200,
  },
  inputIcon: {
    width: 22,
    height: 22,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    borderRadius: 15,
    backgroundColor: '#00a8cc',
    marginBottom: 5,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius:40,
    marginBottom: 50,
    marginTop: -10,
  },
  signUpText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  toast: {
    color: '#21243d',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
