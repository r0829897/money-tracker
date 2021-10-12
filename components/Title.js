import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PoppinsText from "./PoppinsText";

export default Title = () => {
  return (
    <View style={styles.container}>
      <PoppinsText
        style={{
          color: "#36AD4A",
          fontWeight: "bold",
          fontSize: 15,
          marginRight: 3,
        }}
      >
        Money
      </PoppinsText>
      <PoppinsText
        style={{ color: "#B2B9B3", fontWeight: "bold", fontSize: 15 }}
      >
        Tracker
      </PoppinsText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});
