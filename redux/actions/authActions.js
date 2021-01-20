import firebase from "firebase";
import { apiDispatch } from "../../utils";
import {
  AUTHENTICATION_BEGIN,
  AUTHENTICATION_SUCCESS,
  SET_ERROR,
  SIGN_OUT_BEGIN,
  SIGN_OUT_SUCCESS,
  CREATE_NEWUSER_BEGIN,
  CREATE_NEWUSER_SUCCESS,
} from "../constants/authConstants";
import Toast from "react-native-simple-toast";
import { TOGGLE_TOUR_COMPLETE } from "../constants/miscConstants";

export const signInWithEmail = ({ email, password }) => {
  return (dispatch) => {
    dispatch(apiDispatch(AUTHENTICATION_BEGIN));
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        Toast.show("Successfully Authenticated");
        dispatch(apiDispatch(AUTHENTICATION_SUCCESS, user));
      })
      .catch((error) => {
        dispatch(apiDispatch(SET_ERROR, error));
        var errorCode = error.code;
        var errorMessage = error.message;
        Toast.show(errorMessage);
        console.log({ errorCode, errorMessage });
      });
  };
};

export const signOutUser = () => {
  console.log("in sign out use function");
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
      .then((user) => {
        console.log(user);
        Toast.show("New Account Created");
        dispatch(apiDispatch(CREATE_NEWUSER_SUCCESS, user));
        dispatch(apiDispatch(TOGGLE_TOUR_COMPLETE, false));
      })
      .catch((err) => {
        console.log(err);
        Toast.show(err.message);
        dispatch(apiDispatch(SET_ERROR, err));
      });
  };
};
