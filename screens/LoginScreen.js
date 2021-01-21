/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  Button,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import * as AppAuth from "expo-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { signInWithEmail } from "../redux/actions/authActions";
import globalStyles from "../global/globalStyles";
import { AUTH_TOKEN_KEY } from "../redux/constants/authConstants";

const LoginScreen = ({ navigation }) => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const dispatch = useDispatch();

  const signInSchema = yup.object({
    email: yup.string().email("Invalid email fomat").required(),
    password: yup.string().required().min(6),
  });

  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  let config = {
    issuer: "https://accounts.google.com",
    scopes: ["openid", "profile"],
    /* To be replaced */
    clientId:
      "603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com",
  };

  async function signInAsync() {
    let authState = await AppAuth.authAsync(config);
    await cacheAuthAsync(authState);
    console.log("signInAsync", authState);
    return authState;
  }

  async function cacheAuthAsync(authState) {
    return await AsyncStorage.setItem(
      AUTH_TOKEN_KEY,
      JSON.stringify(authState)
    );
  }

  async function getCachedAuthAsync() {
    let value = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    let authState = JSON.parse(value);
    console.log("getCachedAuthAsync", authState);
    if (authState) {
      if (checkIfTokenExpired(authState)) {
        return refreshAuthAsync(authState);
      } else {
        return authState;
      }
    }
    return null;
  }

  function checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
  }

  async function refreshAuthAsync({ refreshToken }) {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    console.log("refreshAuth", authState);
    await cacheAuthAsync(authState);
    return authState;
  }

  const handleGoogleSignIn = async () => {
    const _authState = await signInAsync();
    setAuthState(_authState);
    console.log("to be added");
  };

  async function signOutAsync({ accessToken }) {
    try {
      await AppAuth.revokeAsync(config, {
        token: accessToken,
        isClientIdProvided: true,
      });
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      return null;
    } catch (e) {
      alert(`Failed to revoke token: ${e.message}`);
    }
  }

  return (
    <View style={{ ...globalStyles.container, backgroundColor: "#E1F2Fb" }}>
      <Image style={globalStyles.logo} source={require("../assets/logo.png")} />
      <Formik
        initialValues={{
          email: "aldrinjenson@gmail.com",
          password: "12345",
        }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          dispatch(signInWithEmail(values));
          Keyboard.dismiss();
        }}
      >
        {(props) => (
          <>
            <View style={globalStyles.inputContainer}>
              <Image
                style={globalStyles.inputIcon}
                source={require("../assets/email.png")}
              />
              <TextInput
                onBlur={props.handleBlur("email")}
                value={props.values.email}
                style={styles.inputs}
                placeholder="Email"
                textContentType="emailAddress"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                onChangeText={props.handleChange("email")}
              />
            </View>

            {props.touched.email && (
              <Text style={globalStyles.toast}>{props.errors.email}</Text>
            )}

            <View style={globalStyles.inputContainer}>
              <Image
                style={globalStyles.inputIcon}
                source={require("../assets/password.png")}
              />
              <TextInput
                style={styles.inputs}
                onBlur={props.handleBlur("password")}
                placeholder="Password"
                secureTextEntry
                value={props.values.password}
                underlineColorAndroid="transparent"
                onChangeText={props.handleChange("password")}
              />
            </View>
            {props.touched.password && (
              <Text style={globalStyles.toast}>{props.errors.password}</Text>
            )}

            <View
              style={{
                alignItems: "flex-end",
                paddingBottom: 7,
                marginRight: 12,
                marginTop: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPasswordScreen")}
              >
                <Text
                  style={{ color: "#21243d", textDecorationLine: "underline" }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableHighlight
              style={[globalStyles.buttonContainer, styles.signupButton]}
              onPress={props.handleSubmit}
            >
              <Text style={styles.signUpText}>Login</Text>
            </TouchableHighlight>
          </>
        )}
      </Formik>

      <TouchableHighlight
        style={{ ...globalStyles.buttonContainer, marginBottom: 20 }}
        onPress={handleGoogleSignIn}
      >
        <Text style={styles.googleSignInText}>Sign In With Google</Text>
      </TouchableHighlight>
      <Button
        title="sign out from gooogle"
        onPress={async () => {
          await signOutAsync(authState);
          setAuthState(null);
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            color: "#21243d",
            fontWeight: "900",
            fontSize: 14,
            letterSpacing: 0.8,
          }}
        >
          Don't have an Account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text
            style={{
              color: "black",
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>

        {isLoading && <ActivityIndicator size="large" animating={true} />}
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputs: {
    width: 200,
  },
  signUpText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  googleSignInText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
  },
});
