import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { tops, bottoms } from "../global/tempData";
import { EvilIcons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
// import SvgOrImage from "../components/SvgOrImage";
import { useDispatch } from "react-redux";
import { signOutUser } from "../redux/actions/authActions";
const WardrobeScreen = () => {
  const [topUrl, setTopUrl] = useState(null);
  const [bottomUrl, setBottomUrl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (type, url) => {
    if (type === "top") setTopUrl(url);
    else setBottomUrl(url);
  };

  const handleClear = () => {
    setTopUrl(null);
    setBottomUrl(null);
  };
  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    await Sharing.shareAsync(topUrl);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Image
          // eslint-disable-next-line no-undef
          source={require("../assets/body.png")}
          width={100}
          height={100}
        />
        <Image
          source={{ uri: topUrl }}
          style={{
            height: 128,
            width: 154,
            position: "absolute",
            top: 138,
            left: 132,
          }}
        />
        <Image
          source={{ uri: bottomUrl }}
          style={{
            width: 153,
            height: 168,
            position: "absolute",
            top: 260,
            left: 131,
          }}
        />
      </View>
      <View style={styles.share}>
        <TouchableOpacity onPress={openShareDialogAsync}>
          <EvilIcons name="share-google" size={70} color="blue" />
        </TouchableOpacity>
      </View>
      <Button title="Clear" onPress={handleClear} />
      <Button title="LogOut" onPress={() => dispatch(signOutUser())} />

      <View style={styles.bottomDoubleBar}>
        <ScrollView horizontal style={styles.row}>
          {tops.map(({ id, imgUrl }) => (
            <TouchableOpacity
              key={id}
              onPress={() => handleClick("top", imgUrl)}
            >
              <Image key={id} source={{ uri: imgUrl }} style={styles.image} />
              {/* <SvgOrImage key={id} uri={imgUrl} styles={styles.image} /> */}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView horizontal style={styles.row}>
          {bottoms.map(({ id, imgUrl }) => (
            <TouchableOpacity
              key={id}
              onPress={() => handleClick("bottom", imgUrl)}
            >
              {/* <SvgOrImage key={id} uri={imgUrl} styles={styles.image} /> */}
              <Image key={id} source={{ uri: imgUrl }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default WardrobeScreen;

const styles = StyleSheet.create({
  row: {
    marginVertical: 5,
  },
  image: {
    height: 75,
    width: 75,
    marginHorizontal: 5,
  },
  share: {
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 1,
    marginTop: -180,
  },
});
