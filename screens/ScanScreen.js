import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View ,TouchableOpacity} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons ,Ionicons} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
const flashModes = {
  0: { type: "off", icon: "flash-off" },
  1: { type: "on", icon: "flash-on" },
  2: { type: "auto", icon: "flash-auto" },
};

const ScanScreen = () => {
  const { Type: cType } = Camera.Constants;
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [flashIndex, setFlashIndex] = useState(0);
  const [cameraType, setCameraType] = useState(cType.back);
  const [imgUrl, setImgUrl] = useState(null);
  const cameraRef = useRef();
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  }
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
      <View style={styles.bottomButtons}>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
      <Ionicons name="image" size={53} color="black" />
      </TouchableOpacity>

      <MaterialIcons
        name="photo-camera"
        size={56}
        color="black"
        onPress={handleSnap}
        style={styles.scan}
      />
      <View></View>
      </View>
      
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  camera: {
    width: "75%",
    height: "75%",
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginLeft:-50
  },
  scan:{
 
  }
});
