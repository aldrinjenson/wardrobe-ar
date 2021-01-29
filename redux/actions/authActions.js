import firebase from "firebase";
import { addUserToFirebase, apiDispatch } from "../../global/utils";
import {
  SIGN_IN_BEGIN,
  SIGN_IN_SUCCESS,
  SET_ERROR,
  SIGN_OUT_BEGIN,
  SIGN_OUT_SUCCESS,
  CREATE_NEWUSER_BEGIN,
  CREATE_NEWUSER_SUCCESS,
  SET_USER_AUTH_DETAILS,
} from "../constants/authConstants";
import Toast from "react-native-simple-toast";
import * as Google from "expo-google-app-auth";

import { TOGGLE_TOUR_COMPLETE } from "../constants/miscConstants";
import { authConfig } from "../../config";

export const signInWithEmail = ({ email, password }) => {
  return (dispatch) => {
    dispatch(apiDispatch(SIGN_IN_BEGIN));
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        Toast.show("Successfully Authenticated");
        dispatch(
          apiDispatch(SIGN_IN_SUCCESS, {
            name: user.displayName,
            email: user.email,
            id: user.uid,
          })
        );
      })
      .catch((error) => {
        dispatch(apiDispatch(SET_ERROR, error));
        const errorCode = error.code;
        const errorMessage = error.message;
        Toast.show(errorMessage);
        console.log({ errorCode, errorMessage });
      });
  };
};

export const logInWithGoogle = () => {
  return (dispatch) => {
    dispatch(apiDispatch(SIGN_IN_BEGIN));
    Google.logInAsync(authConfig)
      .then(({ user }) => {
        const newUser = {
          name: user.name,
          email: user.email,
          id: user.id,
          clothes: null,
          didSignUpWithGoogle: true,
        };
        Toast.show("Successfully Authenticated");
        dispatch(apiDispatch(SIGN_IN_SUCCESS, newUser));
        addUserToFirebase(user.id, newUser);
      })
      .catch((error) => {
        dispatch(apiDispatch(SET_ERROR, error));
        const errorCode = error.code;
        const errorMessage = error.message;
        Toast.show(errorMessage);
        console.log({ errorCode, errorMessage });
      });
  };
};

export const signOutUser = () => {
  return (dispatch) => {
    dispatch(apiDispatch(SIGN_OUT_BEGIN));
    firebase
      .auth()
      .signOut()
      .then(() => {
        Toast.show("successfully signed out");
        dispatch(apiDispatch(SIGN_OUT_SUCCESS));
      })
      .catch((err) => {
        console.log(err);
        Toast.show(err.message);
        dispatch(apiDispatch(SET_ERROR, err));
      });
  };
};

export const createNewUser = ({ email, password, userName }) => {
  return (dispatch) => {
    dispatch(apiDispatch(CREATE_NEWUSER_BEGIN));
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        Toast.show("New Account Created");
        const newUser = {
          name: userName,
          email: user.email,
          id: user.uid,
          clothes: null,
          didSignUpWithGoogle: false,
        };
        dispatch(apiDispatch(CREATE_NEWUSER_SUCCESS, newUser));
        dispatch(apiDispatch(TOGGLE_TOUR_COMPLETE, false));
        addUserToFirebase(user.uid, newUser);
      })
      .catch((err) => {
        console.log(err);
        Toast.show(err.message);
        dispatch(apiDispatch(SET_ERROR, err));
      });
  };
};

export const sendPasswordResetEmail = (email) => {
  return () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Toast.show("Password Reset Mail sent. Please check your mail")
      )
      .catch((err) => {
        if (err.code === 0) {
          // or whatever
          // if the user does not exist, check if the user signed up with google, if so,
          // send toast message to log in with google
        } else {
          console.log(err);
          Toast.show(err.message, Toast.LONG);
        }
      });
  };
};

export const setUserDetails = (user) => {
  return { type: SET_USER_AUTH_DETAILS, payload: user };
};
