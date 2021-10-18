import React, { useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Alert } from "react-native";
import PoppinsText from "./PoppinsText";
import PaymentItem from "./PaymentItem";
import { URL_SERVER } from "../config";
import EditPaymentModal from "./Modals/EditPaymentModal";
import axios from "axios";

export default Payments = ({ payments, onPress, id, currentSaldo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const deletePayment = async (paymentId) => {
    try {
      const res = await axios.patch(`${URL_SERVER}api/deletePayment/${id}`, {
        paymentId,
      });
      onPress(res.data);
      console.log(`Deleted payment with id ${paymentId}, updated user:`);
      console.log(res.data);
    } catch (err) {
      console.log(`Error while deleting payment: ${err}`);
    }
  };

  const renderItem = ({ item }) => (
    <PaymentItem
      payment={item}
      onPressDelete={deletePayment}
      onPressEdit={(payment) => {
        setModalVisible(true);
        setEditingPayment(payment);
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EditPaymentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={onPress}
        payment={editingPayment}
        id={id}
        currentSaldo={currentSaldo}
      />

      <PoppinsText style={styles.header}>Recent Payments</PoppinsText>
      <View style={styles.payments}>
        <FlatList
          data={payments}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "#E5E6F5",
    textAlign: "center",
    letterSpacing: 3.04,
    textTransform: "uppercase",
    fontSize: 17,
    marginBottom: 23,
  },
  payments: {
    flex: 1,
    paddingBottom: 10,
  },
});
