import React, { useState } from "react";
import { useSelector } from "react-redux";

import HomeStack from "../routes/HomeStack";
import OnboardingScreen from "../screens/Onboarding";
import LoginStack from "../routes/LoginStack";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isTourComplete = useSelector(
    (state) => state.miscReducer.isTourComplete
  );

  return (
    <>
      {!isLoggedIn ? (
        <LoginStack setIsLoggedIn={setIsLoggedIn} />
      ) : isTourComplete ? (
        <HomeStack setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <OnboardingScreen />
      )}
    </>
  );
};

export default Main;
