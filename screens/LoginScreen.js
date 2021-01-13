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
// import deviceStorage from '../AsyncStorage/Asyncdevice';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'a',
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


    // Keyboard.dismiss();
    // try {
    //   this.setState({form: false, form1: false, form2: false, passf: false});
    //   if (this.state.email) {
    //     const validate = email => {
    //       const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    //       return expression.test(String(email).toLowerCase());
    //     };
    //     if (validate(this.state.email) === false) {
    //       return this.setState({form: true});
    //     }
    //   }
    //   if (this.state.password.length < 6) {
    //     return this.setState({passf: true});
    //   } else {
    //     this.setState({
    //       loading: true,
    //       form: false,
    //       form1: false,
    //       form2: false,
    //       passf: false,
    //     });
    //     this.setState({disabled: true});
    //     let res = await fetch('https://rk-mh-app.herokuapp.com/login', {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email: this.state.email,
    //         password: this.state.password,
    //       }),
    //     });
    //     const statuscode = await res.status;
    //     if (statuscode === 400) {
    //       this.setState({form1: true, disabled: false, loading: false});
    //     } else if (statuscode !== 200) {
    //       this.setState({form2: true, disabled: false, loading: false});
    //     } else {
    //       const response = await res.json();
    //       this.setState({disabled: false, loading: false});
    //       await deviceStorage.saveKey('id_token', response.token);
    //       this.props.navigation.navigate('main');
    //     }
    //   }
    // } catch {
    //   this.setState({form2: true, disabled: false, loading: false});
    // }


  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <View>
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

              paddingBottom: 7,
              marginRight: 12,
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={{color: '#21243d', textDecorationLine: 'underline'}}>
                Forgotpassword?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.signupButton]}
          onPress={() => this.props.navigation.navigate('HomeStack')}
          disabled={this.state.disabled}>
          <Text style={styles.signUpText}>Login</Text>
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
            Don't have an Account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('signup')}>
            <Text
              style={{
                color: 'black',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              Sign Up
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
