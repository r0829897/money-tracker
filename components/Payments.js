import React from "react";
import { View, StyleSheet } from "react-native";
import PoppinsText from "./PoppinsText";
import PaymentItem from "./PaymentItem";
import { URL_SERVER } from "../config";

export default Payments = ({ payments }) => {
  // const DUMMY_PAYMENTS = [
  //   {
  //     id: 1,
  //     title: "Food",
  //     amount: -20,
  //     date: "25 okt",
  //   },
  //   {
  //     id: 2,
  //     title: "Student Job",
  //     amount: 50,
  //     date: "21 okt",
  //   },
  //   {
  //     id: 3,
  //     title: "Food",
  //     amount: -15,
  //     date: "15 okt",
  //   },
  //   {
  //     id: 4,
  //     title: "Shopping",
  //     amount: -30,
  //     date: "9 okt",
  //   },
  //   {
  //     id: 5,
  //     title: "Equipment",
  //     amount: -7,
  //     date: "5 okt",
  //   },
  // ];

  return (
    <View>
      <PoppinsText style={styles.header}>Recent Payments</PoppinsText>
      <View style={styles.payments}>
        {payments.map((payment) => (
          <PaymentItem
            key={payment._id}
            id={payment._id}
            title={payment.title}
            amount={payment.amount}
            date={payment.date.split("T")[0]}
          />
        ))}
      </View>
    </View>
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
    display: "flex",
    flexDirection: "column",
  },
});
