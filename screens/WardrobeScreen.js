import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { tops, bottoms } from "../tempData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SvgOrImage from "../components/SvgOrImage";
const WardrobeScreen = () => {
  const [topUrl, setTopUrl] = useState("");
  const [bottomUrl, setBottomUrl] = useState("");

  const handleClick = (type, url) => {
    console.log({ type, url });
    if (type === "top") setTopUrl(url);
    else setBottomUrl(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          // backgroundColor: "#7fba8e",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <MaterialCommunityIcons
          name="human-handsdown"
          size={420}
          color="#e0ac69"
        />
        <SvgOrImage
          uri={topUrl}
          styles={{ width: 200, height: 200, position: "absolute" }}
        />
        <SvgOrImage
          uri={bottomUrl}
          styles={{ width: 180, height: 180, position: "absolute", top: 300 }}
        />
      </View>

      <View style={styles.bottomDoubleBar}>
        <ScrollView horizontal style={styles.row}>
          {tops.map(({ id, imgUrl }) => (
            <TouchableOpacity
              key={id}
              onPress={() => handleClick("top", imgUrl)}
            >
              <SvgOrImage key={id} uri={imgUrl} styles={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView horizontal style={styles.row}>
          {bottoms.map(({ id, imgUrl }) => (
            <TouchableOpacity
              key={id}
              onPress={() => handleClick("bottom", imgUrl)}
            >
              <SvgOrImage key={id} uri={imgUrl} styles={styles.image} />
              {/* <Image key={id} source={{ uri: imgUrl }} style={styles.image} /> */}
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
});
