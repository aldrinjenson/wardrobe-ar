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
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const LoginScreen = ({ route, navigation }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setIsTourComplete } = route.params;

  const signInSchema = yup.object({
    email: yup.string().email("Invalid email fomat").required(),
    password: yup.string().required().min(6),
  });

  const handleGoogleSignIn = () => {};

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={signInSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.resetForm();
          setIsLoggedIn(true);
        }}
      >
        {(props) => (
          <>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
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
              <Text style={styles.toast}>{props.errors.email}</Text>
            )}

            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
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
              <Text style={styles.toast}>{props.errors.password}</Text>
            )}

            <View
              style={{
                alignItems: "flex-end",
                paddingBottom: 7,
                marginRight: 12,
                marginTop: 5,
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{ color: "#21243d", textDecorationLine: "underline" }}
                >
                  Forgotpassword?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.signupButton]}
              onPress={props.handleSubmit}
            >
              <Text style={styles.signUpText}>Login</Text>
            </TouchableHighlight>
          </>
        )}
      </Formik>

      <TouchableHighlight
        style={[styles.buttonContainer, styles.signInWithGoogle]}
        onPress={handleGoogleSignIn}
      >
        <Text style={styles.googleSignInText}>Sign In With Google</Text>
      </TouchableHighlight>
      <ActivityIndicator size="large" animating={isLoading} />
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            color: "#21243d",
            fontWeight: "900",
            fontSize: 14,
            letterSpacing: 0.8,
          }}
        >
          Don't have an Account?
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SignupScreen", {
              setIsLoggedIn,
              setIsTourComplete,
            })
          }
        >
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
      </View>
      {error && (
        <Text style={{ ...styles.toast, paddingTop: 20 }}>
          Error in establishing connection
        </Text>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E1F2Fb",
  },
  inputContainer: {
    backgroundColor: "#fff3ff",
    borderRadius: 17,
    width: 250,
    height: 43,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
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
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    borderRadius: 15,
    backgroundColor: "#00a8cc",
    marginBottom: 5,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 40,
    marginBottom: 50,
    marginTop: -10,
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
  toast: {
    color: "#a00",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
});
