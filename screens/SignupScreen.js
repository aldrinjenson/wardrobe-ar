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
import { useDispatch } from "react-redux";
import { toggleTourComplete } from "../redux/actions/miscActions";

const SignUpScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { setIsLoggedIn } = route.params;

  const signUpSchema = yup.object({
    email: yup.string().email("Invalid email fomat").required(),
    password: yup.string().required().min(6),
    userName: yup.string().required().min(4),
  });

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <Formik
        initialValues={{
          email: "",
          password: "",
          userName: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.resetForm();
          dispatch(toggleTourComplete, false);
          setIsLoggedIn(true);
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
              {props.touched.email && (
                <Text style={styles.toast}>{props.errors.email}</Text>
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
                <Text style={styles.toast}>{props.errors.email}</Text>
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
                <Text style={styles.toast}>{props.errors.password}</Text>
              )}

              <View
                style={{
                  alignItems: "flex-end",

                  paddingBottom: 20,
                  marginRight: 12,
                  marginTop: 5,
                }}
              ></View>
            </View>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.signupButton]}
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
  toast: {
    color: "#a00",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
});
