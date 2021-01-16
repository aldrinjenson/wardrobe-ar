import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const flashModes = {
  0: { type: "off", icon: "flash-off" },
  1: { type: "on", icon: "flash-on" },
  2: { type: "auto", icon: "flash-auto" },
};

const ScanScreen = ({ navigation }) => {
  const { Type: cType } = Camera.Constants;
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [flashIndex, setFlashIndex] = useState(0);
  const [cameraType, setCameraType] = useState(cType.back);
  const [imgUrl, setImgUrl] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleSnap = async () => {
    const pic = await cameraRef.current.takePictureAsync({
      base64: true,
      skipProcessing: true,
    });
    // navigation.navigate("Wardrobe");
    setImgUrl(pic.uri);
  };
  console.log(imgUrl);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "grey",
      }}
    >
      <Text style={{ marginTop: 15 }}>
        Scan your clothes to add them to your wardrobe
      </Text>
      <View style={styles.topButtons}>
        <MaterialCommunityIcons
          name="camera-switch"
          size={35}
          color="black"
          onPress={() => {
            setCameraType(cameraType === cType.back ? cType.front : cType.back);
          }}
        />
        <MaterialIcons
          name={flashModes[flashIndex].icon}
          size={35}
          color="black"
          onPress={() => setFlashIndex((indx) => (indx + 1) % 3)}
        />
      </View>
      {isFocused && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          flashMode={flashModes[flashIndex]}
          type={cameraType}
        />
      )}
      <MaterialIcons
        name="photo-camera"
        size={75}
        color="black"
        onPress={handleSnap}
      />
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "75%",
    height: "75%",
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
});
