import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Modal,
  Alert,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import PoppinsText from "../PoppinsText";
import { URL_SERVER } from "../../config";
import styles from "./styles/modalStyle";

export default AddPaymentModal = ({
  modalVisible,
  setModalVisible,
  onPress,
  user,
}) => {
  const [title, onChangeTitle] = useState("");
  const [amount, onChangeAmount] = useState("");

  function resetInput() {
    onChangeTitle("");
    onChangeAmount("");
  }

  function valInput() {
    return title && amount;
  }

  const handlePress = async () => {
    if (!valInput()) {
      Alert.alert("Not a valid input");
      return 1;
    }

    try {
      await axios.patch(`${URL_SERVER}api/payments/${user._id}`, {
        title,
        amount,
      });
      const res = await axios.put(`${URL_SERVER}api/currentSaldo/${user._id}`, {
        currentSaldo: user.currentSaldo + Number(amount),
      });
      onPress(res.data);
      console.log(`Added new payment and updated current saldo. Updated user:`);
      console.log(res.data);
    } catch (err) {
      console.log(`Error while adding payent: ${err}\n`);
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
              Add a new payment
            </PoppinsText>
          </View>
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={onChangeTitle}
              placeholder="Title of the payment..."
              placeholderTextColor="#BAADAD"
            />
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={onChangeAmount}
              placeholder="Amount..."
              placeholderTextColor="#BAADAD"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={() => setModalVisible(false)}
            >
              <PoppinsText style={styles.buttonSecondaryText}>
                Close
              </PoppinsText>
            </TouchableOpacity>
            <Pressable
              style={({ pressed }) => [
                pressed && { backgroundColor: "#FFA800" },
                styles.button,
                styles.buttonPrimary,
              ]}
              onPress={() => {
                setModalVisible(false);
                handlePress();
              }}
            >
              <PoppinsText style={styles.buttonPrimaryText}>Add</PoppinsText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
