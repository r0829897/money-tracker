import React from "react";
import { StyleSheet, View } from "react-native";
import PoppinsText from "./PoppinsText";

export default MainCard = ({ currentAmount, monthlyAmount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.primary}>
        <PoppinsText style={styles.header}>Current Saldo</PoppinsText>
        <PoppinsText
          style={styles.currentSaldo}
        >{`€${currentAmount}`}</PoppinsText>
      </View>
      <View style={styles.secondary}>
        <PoppinsText style={styles.subHeader}>Monthly saldo:</PoppinsText>
        <PoppinsText
          style={styles.monthlySaldo}
        >{`€${monthlyAmount}`}</PoppinsText>
      </View>
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
  primary: {
    backgroundColor: "#011E06",
    padding: 24,
  },
  secondary: {
    backgroundColor: "#9CA69D",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  header: {
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 3.12,
  },
  currentSaldo: {
    color: "white",
    fontSize: 44,
    letterSpacing: 3.12,
  },
  subHeader: {
    color: "white",
    fontSize: 12,
    letterSpacing: 3.12,
  },
  monthlySaldo: {
    color: "#FFA800",
    letterSpacing: 3.12,
    marginLeft: 10,
  },
});
