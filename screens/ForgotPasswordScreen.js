/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import globalStyles from "../global/globalStyles";
import { sendPasswordResetEmail } from "../redux/actions/authActions";

const ForgotPasswordScreen = ({ navigation }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) setError("Please enter a valid email address");
    else {
      setError("");
      dispatch(sendPasswordResetEmail(email));
    }
  };

  return (
    <View
      style={{
        ...globalStyles.container,
        backgroundColor: "#E1F2Fb",
      }}
    >
      <Image style={globalStyles.logo} source={require("../assets/logo.png")} />
      <Text
        style={{
          textAlign: "center",
          width: Dimensions.get("window").width - 100,
          marginBottom: 40,
        }}
      >
        Please enter your email and We'll send you a verificatin link to reset
        your password
      </Text>
      <View style={globalStyles.inputContainer}>
        <Image
          style={globalStyles.inputIcon}
          source={require("../assets/email.png")}
        />
        <TextInput
          value={email}
          style={{ width: 200 }}
          placeholder="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <Text style={globalStyles.toast}>{error}</Text>
      <View style={{ alignItems: "center" }}>
        <TouchableHighlight
          style={{
            ...globalStyles.buttonContainer,
            marginBottom: 10,
          }}
          onPress={handleSubmit}
        >
          <Text style={styles.signUpText}>Send Verification Email</Text>
        </TouchableHighlight>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text
            style={{
              color: "#21243d",
              textDecorationLine: "underline",
              padding: 20,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  signUpText: {
    color: "white",
  },
});
