import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={{ justifyContent: "space-evenly", flex: 1 }}>
      <Text>LoginScreen</Text>
      <Button title="Login" onPress={() => navigation.navigate("HomeStack")} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
