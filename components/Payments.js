import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Alert } from "react-native";
import PoppinsText from "./PoppinsText";
import PaymentItem from "./PaymentItem";

export default Payments = ({ payments }) => {
  const deletePayment = () => {
    Alert.alert("Delete payment");
  };
  const editPayment = () => {
    Alert.alert("Edit payment");
  };

  const renderItem = ({ item }) => (
    <PaymentItem
      id={item._id}
      title={item.title}
      amount={item.amount}
      date={item.date.split("T")[0]}
      onPressDelete={deletePayment}
      onPressEdit={editPayment}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
