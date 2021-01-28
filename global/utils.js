import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase";

export const apiDispatch = (actionType = "", data = null) => {
  return {
    type: actionType,
    payload: data,
  };
};

export const getFromAsyncStorage = (key) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem(key);
      resolve(value);
    } catch (error) {
      console.log("error in retrieving from async storage");
      reject(error);
    }
  });
};

export const addToAsyncStorage = async (key, value) => {
  const existingObj = await getFromAsyncStorage(key);
  const stringifiedNewObj = JSON.stringify(value);

  if (existingObj !== stringifiedNewObj)
    AsyncStorage.setItem(key, stringifiedNewObj)
      .then(() => console.log("saved to async storage"))
      .catch((err) => console.log("error in saving to async storage" + err));
};

export const flashModes = {
  0: { type: "off", icon: "flash-off" },
  1: { type: "on", icon: "flash-on" },
  2: { type: "auto", icon: "flash-auto" },
};

export const addUserToFirebase = (id, newUser) => {
  const usersRef = firebase.firestore().collection("users").doc(id);
  usersRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      console.log("user exists");
    } else {
      usersRef
        .set(newUser)
        .then(() => console.log("added user to firebase"))
        .catch((err) => console.log("error with firebase" + err));
    }
  });
};
