import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

const SvgOrImage = ({ uri, styles = { height: 100, width: 100 } }) => {
  console.log(uri);
  if (!uri) return null;
  return (
    <>
      {uri.split(".").pop() === "svg" ? (
        <SvgUri
          width={styles.width}
          height={styles.height}
          style={styles}
          uri={uri}
        />
      ) : (
        <Image source={{ uri: uri }} style={{ ...styles }} />
      )}
    </>
  );
};

export default SvgOrImage;

const styles = StyleSheet.create({});
