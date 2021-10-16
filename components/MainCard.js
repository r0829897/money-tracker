import React from "react";
import { StyleSheet, View } from "react-native";
import CurrentSaldo from "./CurrentSaldo";
import { LinearGradient } from "expo-linear-gradient";

export default MainCard = ({ currentSaldo, user, onPress }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(255, 168, 0, 0.45) 0%", "rgba(96, 97, 120, 0.22) 100%"]}
      >
        <CurrentSaldo
          currentSaldo={currentSaldo}
          onPress={onPress}
          userId={user._id}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 41,
    marginBottom: 50,
    padding: 24,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "red",
  },
});
