/* eslint-disable no-undef */
import React from "react";
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
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../redux/actions/authActions";
import globalStyles from "../global/globalStyles";

const SignUpScreen = ({ navigation }) => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const dispatch = useDispatch();

  const signUpSchema = yup.object({
    email: yup.string().email("Invalid email fomat").required(),
    password: yup.string().required().min(6),
    userName: yup.string().required().min(4),
  });

  return (
    <View style={styles.container}>
      <Image style={globalStyles.logo} source={require("../assets/logo.png")} />
      <Formik
        initialValues={{
          email: "test@test.com",
          password: "123456",
          userName: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          Keyboard.dismiss();
          dispatch(createNewUser(values));
        }}
      >
        {(props) => (
          <>
            <View style={{ alignItems: "center" }}>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.inputIcon}
                  source={require("../assets/user.png")}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Username"
                  underlineColorAndroid="transparent"
                  onChangeText={props.handleChange("userName")}
                  onBlur={props.handleBlur("userName")}
                  value={props.values.userName}
                />
              </View>
              {props.touched.userName && (
                <Text style={globalStyles.toast}>{props.errors.userName}</Text>
              )}
              <View style={styles.inputContainer}>
                <Image
                  style={styles.inputIcon}
                  source={require("../assets/email.png")}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                  value={props.values.email}
                />
              </View>
              {props.touched.email && (
                <Text style={globalStyles.toast}>{props.errors.email}</Text>
              )}

              <View style={styles.inputContainer}>
                <Image
                  style={styles.inputIcon}
                  source={require("../assets/password.png")}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={props.handleChange("password")}
                  onBlur={props.handleBlur("password")}
                  value={props.values.password}
                />
              </View>

              {props.touched.password && (
                <Text style={globalStyles.toast}>{props.errors.password}</Text>
              )}
            </View>
            <TouchableHighlight
              style={{
                ...globalStyles.buttonContainer,
                ...styles.signupButton,
                marginTop: 25,
              }}
              onPress={props.handleSubmit}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableHighlight>
          </>
        )}
      </Formik>

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
          Already have an Account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text
            style={{
              color: "black",
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
  signUpText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
