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

const HomeScreen = () => {
  const [topUrl, setTopUrl] = useState();
  const [bottomUrl, setBottomUrl] = useState();

  const handleClick = (type, url) => {
    console.log({ type, url });
    setTopUrl(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#7fba8e",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <MaterialCommunityIcons
          name="human-handsdown"
          size={420}
          color="black"
        />
        {topUrl && (
          <Image
            source={{ uri: topUrl }}
            style={{ width: 200, height: 150, position: "absolute", top: 160 }}
          />
        )}
      </View>

      <View style={styles.bottomDoubleBar}>
        <ScrollView horizontal style={styles.row}>
          {tops.map(({ id, imgUrl }) => (
            <TouchableOpacity
              key={id}
              onPress={() => handleClick("top", imgUrl)}
            >
              <Image key={id} source={{ uri: imgUrl }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView horizontal style={styles.row}>
          {bottoms.map(({ id, imgUrl }) => (
            <TouchableOpacity
              key={id}
              onPress={() => handleClick("bottom", imgUrl)}
            >
              <Image key={id} source={{ uri: imgUrl }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

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
