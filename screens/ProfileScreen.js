import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import {
  sendPasswordResetEmail,
  signOutUser,
} from "../redux/actions/authActions";
import { toggleTourComplete } from "../redux/actions/miscActions";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const showDeleteAlert = () =>
    Alert.alert(
      "Delete Account?",
      "Are you sure you want to delete your account and clear all your data?",
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: () => {
            console.log("Delete action to be dispatched");
            dispatch(signOutUser());
          },
        },
      ],
      { cancelable: false }
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          alignItems: "center",
          marginVertical: 30,
          position: "relative",
        }}
      >
        <Image
          // eslint-disable-next-line no-undef
          source={require("../assets/user.png")}
          style={{ width: 100, height: 100 }}
        />
        <MaterialIcons
          name="edit"
          size={25}
          style={{
            position: "absolute",
            top: 65,
            left: width / 2 + 35,
          }}
        />
        <Text style={styles.textRow}>{user.name}</Text>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "#555",
          marginHorizontal: 30,
        }}
      ></View>
      <View style={{ marginHorizontal: 15 }}>
        <Text style={styles.title}>Account Details</Text>
        <View>
          <Text style={styles.textRow}>Email: {user.email}</Text>
        </View>
        <Text style={styles.title}>Settings</Text>
        <View>
          <TouchableOpacity onPress={() => dispatch(toggleTourComplete(false))}>
            <Text style={styles.textRow}>Show Tour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(sendPasswordResetEmail(user.email))}
          >
            <Text style={styles.textRow}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(signOutUser())}>
            <Text style={styles.textRow}>Sign Out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showDeleteAlert}>
            <Text style={styles.textRow}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  textRow: {
    fontSize: 17,
    marginVertical: 5,
  },
  title: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
});
