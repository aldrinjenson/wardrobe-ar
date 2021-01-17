import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import HomeStack from "./routes/HomeStack";
import OnboardingScreen from "./screens/Onboarding";
import LoginStack from "./routes/LoginStack";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTourComplete, setIsTourComplete] = useState(true);

  return (
    <>
      {!isLoggedIn ? (
        <LoginStack
          setIsLoggedIn={setIsLoggedIn}
          setIsTourComplete={setIsTourComplete}
        />
      ) : isTourComplete ? (
        <HomeStack setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <OnboardingScreen setIsTourComplete={setIsTourComplete} />
      )}
    </>
  );
};

export default App;
