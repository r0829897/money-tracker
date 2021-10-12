import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import PoppinsText from "./PoppinsText";
import PaymentItem from "./PaymentItem";

export default Payments = ({ payments }) => {
  const renderItem = ({ item }) => (
    <PaymentItem
      id={item._id}
      title={item.title}
      amount={item.amount}
      date={item.date.split("T")[0]}
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
    color: "#707671",
    letterSpacing: 2.72,
    textTransform: "uppercase",
    fontSize: 16,
    marginBottom: 20,
  },
  payments: {
    paddingBottom: 50,
  },
});
