import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeStack from "./HomeStack";
import OnboardingScreen from "./screens/Onboarding";

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTourComplete, setIsTourComplete] = useState(true);

  return (
    <>
      {!isLoggedIn ? (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              initialParams={{ setIsLoggedIn, setIsTourComplete }}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : isTourComplete ? (
        <HomeStack />
      ) : (
        <OnboardingScreen setIsTourComplete={setIsTourComplete} />
      )}
    </>
  );
};

export default App;
