import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import PoppinsText from "./PoppinsText";
import CurrentSaldoModal from "./Modals/CurrentSaldoModal";

export default CurrentSaldo = ({ currentSaldo, onPress, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setModalVisible(true)}
    >
      <CurrentSaldoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={onPress}
        userId={userId}
      />

      <PoppinsText style={styles.title}>Current saldo</PoppinsText>
      <PoppinsText style={styles.currentSaldo}>{`€${
        Math.round(currentSaldo * 100) / 100 // round to 2 decimal places
      }`}</PoppinsText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 29,
  },
  title: {
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "500",
    letterSpacing: 2.16,
    textAlign: "center",
    marginBottom: 10,
  },
  currentSaldo: {
    color: "white",
    fontSize: 66,
    fontWeight: "500",
    letterSpacing: 3.44,
    textAlign: "center",
  },
});
