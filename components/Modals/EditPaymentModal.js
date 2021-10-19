import React, { useState } from "react";
import {
  View,
  Modal,
  Alert,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import PoppinsText from "../PoppinsText";
import axios from "axios";
import { URL_SERVER } from "../../config";
import styles from "./styles/modalStyle";

export default EditPaymentModal = ({
  modalVisible,
  setModalVisible,
  onPress,
  payment,
  id,
  currentSaldo,
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
      if (newPayment.amount !== payment.amount) {
        await axios.put(`${URL_SERVER}api/currentSaldo/${id}`, {
          currentSaldo: currentSaldo + (newPayment.amount - payment.amount),
        });
        console.log(
          `New amount, added the difference to currentSaldo: ${
            newPayment.amount - payment.amount
          }`
        );
      }

      const res = await axios.patch(`${URL_SERVER}api/editPayment/${id}`, {
        payment: newPayment,
      });
      onPress(res.data);
      console.log(`Updated payment, updated payment:`);
      console.log(payment);
      console.log("===>");
      console.log(newPayment);
    } catch (err) {
      console.log(`Error while editing payment: ${err}`);
    }
    resetInput();
  };

  // const handlePress = async () => {
  //   const newPayment = {
  //     ...payment,
  //     title: title ? title : payment.title,
  //     amount: amount ? Number(amount) : payment.amount,
  //   };

  //   if (newPayment.amount !== payment.amount) {
  //     try {
  //       const res = await axios.put(`${URL_SERVER}api/currentSaldo/${id}`, {
  //         currentSaldo: currentSaldo + (newPayment.amount - payment.amount),
  //       });
  //       onPress(res.data);
  //       console.log(
  //         `New amount, added the difference to currentSaldo: ${
  //           newPayment.amount - payment.amount
  //         }`
  //       );
  //     } catch (err) {
  //       console.log(
  //         `Error while trying to update currentSaldo while editing payment: ${err}`
  //       );
  //     }
  //   }

  //   try {
  //     const res = await axios.patch(`${URL_SERVER}api/editPayment/${id}`, {
  //       payment: newPayment,
  //     });
  //     onPress(res.data);
  //     console.log(`Updated payment, updated user:`);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(`Error while trying to update payment: ${err}`);
  //   }

  //   resetInput();
  // };

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
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={onChangeTitle}
              placeholder="Edit the title..."
              placeholderTextColor="#BAADAD"
            />
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={onChangeAmount}
              placeholder="New amount..."
              placeholderTextColor="#BAADAD"
              keyboardType="numeric"
            />
          </View>
          <PoppinsText style={[styles.infoText, { marginTop: -10 }]}>
            * Empty fields will keep the same values.
          </PoppinsText>
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
              <PoppinsText style={styles.buttonPrimaryText}>Edit</PoppinsText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
