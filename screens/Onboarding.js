import React from "react";
import { StyleSheet, Text, View,Image } from "react-native";

import Onboarding from 'react-native-onboarding-swiper';
const OnboardingScreen = () => {
  return (
      <Onboarding
      // onDone={component}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/Untitled-1.png')} style={{width:300,height:300}}/>,
        title: 'Scan your Clothing in Our App',
        subtitle: '',
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image source={require('../assets/Untitled-2.png')} style={{width:300,height:300}}/>,
        title: 'See your Avatar Wearing the clothing',
        subtitle: '',
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('../assets/Untitled-3.png')} style={{width:300,height:300}}/>,
        title: 'Save the collection you want and Digitize your Wardrobe',
        subtitle: "",
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/Untitled-4.png')} style={{width:300,height:300}}/>,
        title: 'Share the avatar among friends to see their suggestions',
        subtitle: "",
      },
    ]}
  />
  );
};

export default OnboardingScreen;

// const styles = StyleSheet.create({});
