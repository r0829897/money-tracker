import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import PoppinsText from "./PoppinsText";
import PaymentItem from "./PaymentItem";
import { SECONDARY_FONT_COLOR, URL_SERVER } from "../config";
import EditPaymentModal from "./Modals/EditPaymentModal";
import axios from "axios";
import CrossIcon from "./icons/CrossIcon";

export default Payments = ({ payments, onPress, id, currentSaldo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const handlePress = () => {
    Alert.alert(
      "Delete recent payments?",
      "This action will make no changes to your current saldo.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const res = await axios.delete(`${URL_SERVER}api/payments/${id}`);
              onPress(res.data);
              console.log("Deleted payments\n");
            } catch (err) {
              console.log(`Error whyle deleting payments: ${err}`);
            }
          },
        },
      ]
    );
  };

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

  const ref = useRef(null);

  const renderItem = ({ item }) => (
    <PaymentItem
      ref={ref}
      payment={item}
      onPressDelete={deletePayment}
      onPressEdit={(payment) => {
        setModalVisible(true);
        setEditingPayment(payment);
      }}
    />
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <EditPaymentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={onPress}
        payment={editingPayment}
        id={id}
        currentSaldo={currentSaldo}
      />

      <View style={styles.headerContainer}>
        <PoppinsText style={styles.header}>Recent Payments</PoppinsText>
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={handlePress}
        >
          <CrossIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.payments}>
        <FlatList
          data={payments}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 23,
  },
  header: {
    color: SECONDARY_FONT_COLOR,
    letterSpacing: 3.04,
    textTransform: "uppercase",
    fontSize: 17,
  },
  payments: {
    flex: 1,
    paddingBottom: 10,
  },
});
