import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import globalStyles from "../global/globalStyles";
import { signOutUser } from "../redux/actions/authActions";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={{ ...globalStyles.container, backgroundColor: "pink" }}>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => dispatch(signOutUser())}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
