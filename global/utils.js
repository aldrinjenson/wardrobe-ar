import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase/app";
import "firebase/storage";

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

export const getEmailsSignedInWithGoogle = async () => {
  const emailsRef = firebase.firestore().collection("emailsSignedUpWithGoogle");
  const allEmails = (await emailsRef.get()).docs.map((doc) => doc.data().email);
  return { allEmails, emailsRef };
};

export const addUserEmailToFirebase = async (email) => {
  const { allEmails, emailsRef } = await getEmailsSignedInWithGoogle();

  if (!allEmails.includes(email)) {
    emailsRef
      .add({ email })
      .then(() => console.log("email added"))
      .catch((err) => console.log("error in adding email" + err));
  }
};

const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

export const uploadToFirebase = async (uri) => {
  const blob = await uriToBlob(uri);
  const storageRef = firebase.storage().ref();
  const uploadUrl = new Promise((resolve, reject) => {
    storageRef
      .child("uploads/photo.jpg")
      .put(blob, {
        contentType: "image/jpeg",
      })
      .then(() => {
        blob.close();
        console.log("File uploaded");
        storageRef
          .child("uploads/photo.jpg")
          .getDownloadURL()
          .then((url) => resolve(url));
      })
      .catch((error) => {
        reject(error);
      });
  });

  return uploadUrl;
};
