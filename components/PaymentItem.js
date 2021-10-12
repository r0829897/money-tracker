import React from "react";
import { View, StyleSheet } from "react-native";
import PoppinsText from "./PoppinsText";

export default PaymentItem = ({ id, title, amount, date }) => {
  return (
    <View key={id} style={styles.container}>
      <View style={styles.amount}>
        <PoppinsText
          // PoppinsText support only 1 style prop
          style={{
            color: amount < 0 ? "#EF1C1C" : "#36AD4A",
            fontSize: 15,
            letterSpacing: 1.2,
            fontWeight: "bold",
          }}
        >
          {amount < 0 ? "-€" + -amount : "+€" + amount}
        </PoppinsText>
      </View>
      <View style={styles.info}>
        <PoppinsText style={styles.title}>{title}</PoppinsText>
        <PoppinsText style={styles.date}>{date}</PoppinsText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F2",
    paddingVertical: 10,
    paddingHorizontal: 3,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 14,
    height: 64,
  },
  amount: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    flexGrow: 1,
  },
  info: {
    marginLeft: 10,
    flexGrow: 5,
  },
  title: {
    fontSize: 13,
  },
  date: {
    color: "#B2B9B3",
    fontSize: 11,
  },
});
