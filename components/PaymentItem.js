import React from "react";
import { View, StyleSheet } from "react-native";
import PoppinsText from "./PoppinsText";

export default PaymentItem = ({ id, title, amount, date }) => {
  return (
    <View key={id} style={styles.container}>
      <View style={styles.info}>
        <PoppinsText style={styles.title}>{title}</PoppinsText>
        <PoppinsText style={styles.date}>{date}</PoppinsText>
      </View>
      <View style={styles.amount}>
        <PoppinsText
          // PoppinsText support only 1 style prop
          style={{
            color: amount < 0 ? "white" : "#FFA800",
            fontSize: 19,
            letterSpacing: 1.2,
            fontWeight: "600",
          }}
        >
          {amount < 0 ? "-€" + -amount : "+€" + amount}
        </PoppinsText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 14,
    height: 71,
    borderWidth: 1,
    borderColor: "#202039",
  },
  amount: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    flexGrow: 1,
    flexShrink: 0,
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    marginLeft: 10,
    flexGrow: 5,
    flexShrink: 1,
  },
  title: {
    fontSize: 13,
    color: "white",
  },
  date: {
    color: "#E5E6F5",
    fontSize: 11,
  },
});
