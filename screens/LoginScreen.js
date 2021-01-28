/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import React, { useState } from "react";
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
import { logInWithGoogle, signInWithEmail } from "../redux/actions/authActions";
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
          email: "test@test.com",
          password: "123456",
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
      <Text style={styles.or}></Text>
      <TouchableHighlight
        style={{ ...globalStyles.buttonContainer, marginBottom: 20 }}
        onPress={() => dispatch(logInWithGoogle())}
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
  or: {
    fontSize: 20,
    letterSpacing: 1,
    paddingBottom: 150,
  },
});
