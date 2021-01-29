import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import axios from "axios";

import { flashModes, uploadToFirebase } from "../global/utils";
import globalStyles from "../global/globalStyles";
import { useEffect } from "react";

const { width } = Dimensions.get("window");

const ScanScreen = () => {
  const { Type: cType } = Camera.Constants;
  const isFocused = useIsFocused();
  const [flashIndex, setFlashIndex] = useState(0);
  const [cameraType, setCameraType] = useState(cType.back);
  const [imgUrl, setImgUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [finalImage, setFinalImage] = useState(null);
  const cameraRef = useRef();

  const [permission, askForPermission] = Permissions.usePermissions([
    Permissions.CAMERA,
    Permissions.MEDIA_LIBRARY,
  ]);

  useEffect(() => {
    if (imgUrl) {
      setFinalImage("");
    }
  }, [imgUrl]);

  const handleUpload = (uri) => {
    setIsLoading(true);
    setModalVisible(true);
    uploadToFirebase(uri)
      .then((storedUrl) => {
        console.log({ storedUrl });
        axios
          .post(`https://arwardrobe.herokuapp.com/image`, { url: storedUrl })
          .then(({ data }) => {
            const { ImageBytes } = data;
            setFinalImage("data:image/jpeg;base64," + ImageBytes);
          });
      })
      .catch((err) => console.log(err));
    // .finally(() => setIsLoading(false));
  };

  const openImagePickerAsync = async () => {
    const { uri } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    handleUpload(uri);
  };

  const handleSnap = async () => {
    const { uri } = await cameraRef.current.takePictureAsync({
      // base64: true,
      skipProcessing: true,
      allowsEditing: true,
    });
    setImgUrl(uri);
    setModalVisible(true);
  };

  if (!permission || permission.status !== "granted") {
    return (
      <View style={[globalStyles.container]}>
        <Text
          style={{
            margin: 10,
            width: width - 80,
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <ActivityIndicator size="large" animating={true} color="black" />
            <Text>Converting image</Text>
            {finalImage?.length && (
              <Image
                source={{ uri: finalImage }}
                width={250}
                height={250}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={{ uri: imgUrl }}
              width={250}
              height={250}
              style={{
                width: width - 100,
                height: width - 100,
                alignSelf: "center",
                marginVertical: 20,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 50,
              }}
            >
              <MaterialCommunityIcons
                name="restart"
                onPress={() => setModalVisible(false)}
                size={40}
                color="black"
              />
              <MaterialIcons
                onPress={() => {
                  handleUpload(imgUrl);
                }}
                name="check"
                size={40}
                color="black"
              />
            </View>
          </View>
        )}
      </Modal>
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

      {finalImage?.length && (
        <Image
          source={{ uri: finalImage }}
          width={250}
          height={250}
          style={{
            width: 100,
            height: 100,
          }}
        />
      )}
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
