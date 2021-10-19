import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import PoppinsText from "./PoppinsText";
import MonthlySaldoModal from "./Modals/MonthlySaldoModal";

export default MonthlySaldo = ({ monthlySaldo, onPress, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setModalVisible(true)}
    >
      <MonthlySaldoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={onPress}
        userId={userId}
      />

      <View style={styles.title}>
        <PoppinsText
          style={{ color: "white", fontSize: 17, letterSpacing: 0.88 }}
        >
          Monthly deposit
        </PoppinsText>
      </View>
      <PoppinsText style={styles.monthlySaldo}>{`€${
        Math.round(monthlySaldo * 100) / 100
      }`}</PoppinsText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    borderWidth: 1,
    borderColor: "#202039",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 10,
  },
  monthlySaldo: {
    color: "#FFA800",
    fontSize: 19,
    letterSpacing: 0.88,
    marginLeft: 20,
  },
});
