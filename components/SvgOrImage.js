import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SvgUri } from "react-native-svg";

const SvgOrImage = ({ uri, styles = {} }) => {
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

// const styles = StyleSheet.create({});
