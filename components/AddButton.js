import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import PoppinsText from "./PoppinsText";
import AddPaymentModal from "./Modals/AddPaymentModal";

export default AddButton = ({ onPress, user }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <AddPaymentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={onPress}
        user={user}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <PoppinsText style={{ color: "white" }}>Add Payment</PoppinsText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  addBtn: {
    overflow: "hidden",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202141",
  },
});
