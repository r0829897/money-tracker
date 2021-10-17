import React from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import PoppinsText from "./PoppinsText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";

const RightActions = ({ progress, dragX, onPressDelete, onPressEdit }) => {
  /* If you wanna put text */

  // const scale = dragX.interpolate({
  //   inputRange: [-100, 0],
  //   outputRange: [1, 0],
  //   extrapolate: "clamp",
  // });
  return (
    <View style={styles.rightAction}>
      <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={onPressEdit}>
        {/* <Animated.Text
          style={{
            color: "#B2B9B3",
            transform: [{ scale }],
            fontFamily: "Poppins_400Regular",
            marginHorizontal: 5,
          }}
        > */}
        <EditIcon />
        {/* </Animated.Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={onPressDelete}>
        {/* <Animated.Text
          style={{
            color: "#BB0909",
            transform: [{ scale }],
            fontFamily: "Poppins_400Regular",
            marginHorizontal: 5,
          }}
        > */}
        <DeleteIcon />
        {/* </Animated.Text> */}
      </TouchableOpacity>
    </View>
  );
};

export default PaymentItem = ({
  id,
  title,
  amount,
  date,
  onPressDelete,
  onPressEdit,
}) => {
  return (
    <View style={styles.container}>
      <Swipeable
        renderRightActions={(progress, dragX) => (
          <RightActions
            progress={progress}
            dragX={dragX}
            onPressDelete={onPressDelete}
            onPressEdit={onPressEdit}
          />
        )}
      >
        <View key={id} style={styles.contentContainer}>
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
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 14,
    height: 71,
    backgroundColor: "#202141",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    overflow: "hidden",
    borderRadius: 10,
    height: 71,
    borderWidth: 1,
    borderColor: "#202039",
    backgroundColor: "#01021B",
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
  rightAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  acionText: {},
});
