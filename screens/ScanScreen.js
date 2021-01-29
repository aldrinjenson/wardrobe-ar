import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import axios from "axios";

import { flashModes } from "../global/utils";
import globalStyles from "../global/globalStyles";

const ScanScreen = () => {
  const { Type: cType } = Camera.Constants;
  const isFocused = useIsFocused();
  const [flashIndex, setFlashIndex] = useState(0);
  const [cameraType, setCameraType] = useState(cType.back);
  const [imgUrl, setImgUrl] = useState(null);
  const cameraRef = useRef();

  const [permission, askForPermission] = Permissions.usePermissions([
    Permissions.CAMERA,
    Permissions.MEDIA_LIBRARY,
  ]);

  const openImagePickerAsync = async () => {
    // const { uri } = await ImagePicker.launchImageLibraryAsync({
    const pic = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (pic.cancelled) {
      return;
    }
    const uri  = pic.uri;
    let filename = uri.split('/').pop();
    let uriArray=uri.split(".");
    let fileType=uriArray[uriArray.length-1]
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append("pic", { uri: uri, name:`photo.${fileType}`, type:"image/jpg"});
    console.log(formData);
    setImgUrl(uri);
    axios.post(`http://127.0.0.1:5000/image`, {
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    }).then(x=>console.log(x))
    .catch((e)=> console.log(e));
  };

  const handleSnap = async () => {
    const pic = await cameraRef.current.takePictureAsync({
      // base64: true,
      skipProcessing: true,
      allowsEditing: true,
    });
    const uri  = pic.uri;
    let filename = uri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    console.log(match);
    let formData = new FormData();
    formData.append('pic', { uri: uri, name: filename, type:"jpg" });
    setImgUrl(uri);
     await fetch('http://127.0.0.1:5000/image', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(x=>console.log(x))
    .catch((e)=> console.log(e));
  };

  if (!permission || permission.status !== "granted") {
    return (
      <View style={[globalStyles.container]}>
        <Text
          style={{
            margin: 10,
            width: Dimensions.get("window").width - 80,
          }}
        >
          Permission needed for accessing camera and media files
        </Text>
        <Button title="Grant permission" onPress={askForPermission} />
      </View>
    );
  }

  return (
    <View
      style={{
        ...globalStyles.container,
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
          size={40}
          color="black"
          onPress={() => {
            setCameraType(cameraType === cType.back ? cType.front : cType.back);
          }}
        />
        <MaterialIcons
          name={flashModes[flashIndex].icon}
          size={40}
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
          ratio="1:1"
        />
      )}
      <MaterialIcons
        name="photo-camera"
        size={56}
        color="black"
        onPress={handleSnap}
      />

      <Ionicons
        name="images"
        size={40}
        color="black"
        onPress={openImagePickerAsync}
        style={styles.galleryIcon}
      />
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
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  galleryIcon: {
    position: "absolute",
    bottom: "1.5%",
    left: 50,
  },
});
