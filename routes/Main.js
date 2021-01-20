import React, { useState } from "react";
import { useSelector } from "react-redux";

import HomeStack from "../routes/HomeStack";
import OnboardingScreen from "../screens/Onboarding";
import LoginStack from "../routes/LoginStack";

const Main = () => {
  const user = useSelector((state) => state.authReducer.user);

  const isTourComplete = useSelector(
    (state) => state.miscReducer.isTourComplete
  );

  return (
    <>
      {!user ? (
        <LoginStack />
      ) : isTourComplete ? (
        <HomeStack />
      ) : (
        <OnboardingScreen />
      )}
    </>
  );
};

export default Main;
