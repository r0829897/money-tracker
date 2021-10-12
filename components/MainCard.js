import React from "react";
import { StyleSheet, View } from "react-native";
import MonthlySaldo from "./MonthlySaldo";
import CurrentSaldo from "./CurrentSaldo";

export default MainCard = ({ currentSaldo, monthlySaldo, user, onPress }) => {
  return (
    <View style={styles.container}>
      <CurrentSaldo
        currentSaldo={currentSaldo}
        onPress={onPress}
        userId={user._id}
      />
      <MonthlySaldo
        monthlySaldo={monthlySaldo}
        onPress={onPress}
        userId={user._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 41,
    marginBottom: 50,
    overflow: "hidden",
    borderRadius: 10,
  },
});
