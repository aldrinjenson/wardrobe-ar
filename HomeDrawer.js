import * as React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ScanScreen from "./screens/ScanScreen";
import ProfileScreen from "./screens/ProfileScreen";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const HomeDrawer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? "#2f95dc" : "#000"}
              name="home"
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? "#2f95dc" : "#000"}
              name="camera"
              size={23}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              color={focused ? "#2f95dc" : "#000"}
              name="person"
              size={23}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default HomeDrawer;
