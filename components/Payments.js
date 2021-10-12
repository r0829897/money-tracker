import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import PoppinsText from "./PoppinsText";
import PaymentItem from "./PaymentItem";
import { URL_SERVER } from "../config";

export default Payments = ({ payments }) => {
  const renderItem = ({ item }) => (
    <PaymentItem
      // key={item._id}
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
        {/* {payments.map((payment) => (
          <PaymentItem
            key={payment._id}
            id={payment._id}
            title={payment.title}
            amount={payment.amount}
            date={payment.date.split("T")[0]}
          />
        ))} */}
        <FlatList
          data={payments}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
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
  // payments: {
  //   display: "flex",
  //   flexDirection: "column",
  // },
  payments: {
    paddingBottom: 50,
  },
});
