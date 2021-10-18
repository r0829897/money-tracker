import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PoppinsText from "../PoppinsText";
import axios from "axios";
import { URL_SERVER } from "../../config";

export default EditPaymentModal = ({
  modalVisible,
  setModalVisible,
  onPress,
  payment,
  id,
}) => {
  const [title, onChangeTitle] = useState("");
  const [amount, onChangeAmount] = useState("");

  function resetInput() {
    onChangeTitle("");
    onChangeAmount("");
  }

  const handlePress = async () => {
    const newPayment = {
      ...payment,
      title: title ? title : payment.title,
      amount: amount ? Number(amount) : payment.amount,
    };

    try {
      const res = await axios.patch(`${URL_SERVER}api/editPayment/${id}`, {
        payment: newPayment,
      });
      onPress(res.data);
      console.log(`Updated payment, updated user:`);
      console.log(res.data);
    } catch (err) {
      console.log(`Error while trying to update payment: ${err}`);
    }

    resetInput();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <PoppinsText style={styles.titleContent}>
              Edit a payment
            </PoppinsText>
          </View>
          <View style={styles.contentContainer}>
            {/* <PoppinsText>Empty fields will remain unedited.</PoppinsText> */}
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={onChangeTitle}
              placeholder="Edit the title..."
            />
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={onChangeAmount}
              placeholder="New amount..."
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={{
                ...styles.button,
                flexBasis: 80,
                marginRight: 10,
                backgroundColor: "#EF1C1C",
              }}
              onPress={() => setModalVisible(false)}
            >
              <PoppinsText style={{ color: "white" }}>Close</PoppinsText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: "#01021B",
                flexBasis: 80,
              }}
              onPress={() => {
                setModalVisible(false);
                handlePress();
              }}
            >
              <PoppinsText style={{ color: "white" }}>Edit</PoppinsText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#353657",
    borderRadius: 10,
    overflow: "hidden",
  },
  titleContainer: {
    backgroundColor: "#202141",
    paddingVertical: 9,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleContent: {
    color: "white",
    fontSize: 15,
  },
  contentContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 250,
    height: 40,
    marginVertical: 5,
    padding: 9,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    paddingBottom: 15,
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  button: {
    overflow: "hidden",
    borderRadius: 10,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
