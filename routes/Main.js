import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, View, Text } from "react-native";

import HomeStack from "../routes/HomeStack";
import OnboardingScreen from "../screens/Onboarding";
import LoginStack from "../routes/LoginStack";
import { addToAsyncStorage, getFromAsyncStorage } from "../global/utils";
import { WARDROBE_AR_USER } from "../redux/constants/userConstants";
import { setUserDetails } from "../redux/actions/authActions";
import { toggleTourComplete } from "../redux/actions/miscActions";
import globalStyles from "../global/globalStyles";

const Main = () => {
  const user = useSelector((state) => state.authReducer.user);
  const isNewUser = useSelector((state) => state.authReducer.isNewUser);
  const isTourComplete = useSelector(
    (state) => state.miscReducer.isTourComplete
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getFromAsyncStorage(WARDROBE_AR_USER)
      .then((obj) => {
        const userObj = JSON.parse(obj);
        if (userObj.user) {
          const { isTourComplete, isNewUser, user } = userObj;
          dispatch(setUserDetails({ isNewUser, user }));
          dispatch(toggleTourComplete(isTourComplete));
        }
      })
      .catch((err) => console.log("Error " + err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const userObj = {
      user,
      isNewUser,
      isTourComplete,
    };
    addToAsyncStorage(WARDROBE_AR_USER, userObj);
  }, [user, isNewUser, isTourComplete]);

  if (isLoading)
    return (
      <View style={globalStyles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" color="#000" animating={true} />
      </View>
    );

  return (
    <>
      {!isTourComplete ? (
        <OnboardingScreen />
      ) : user ? (
        <HomeStack />
      ) : (
        <LoginStack />
      )}
    </>
  );
};

export default Main;
