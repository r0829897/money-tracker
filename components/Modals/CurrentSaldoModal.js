import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Modal,
  Alert,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import PoppinsText from "../PoppinsText";
import { URL_SERVER } from "../../config";
import styles from "./styles/modalStyle";

export default CurrentSaldoModal = ({
  modalVisible,
  setModalVisible,
  onPress,
  userId,
}) => {
  const [input, onChangeInput] = useState("");

  function valInput() {
    if (!Number(input)) return false;
    return Boolean(input);
  }

  const handlePress = async () => {
    if (!valInput()) {
      Alert.alert("Not a valid input");
      return 1;
    }

    try {
      const res = await axios.put(`${URL_SERVER}api/currentSaldo/${userId}`, {
        currentSaldo: Number(input),
      });
      onPress(res.data);
      console.log(`Changed current saldo to: ${res.data.currentSaldo}\n`);
    } catch (err) {
      console.log(`Error while changing current saldo: ${err}\n`);
    }
    onChangeInput("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed...");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <PoppinsText style={styles.titleContent}>
              Edit current saldo
            </PoppinsText>
          </View>
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={onChangeInput}
              placeholder="Enter new current saldo..."
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
              <PoppinsText style={styles.buttonPrimaryText}>Edit</PoppinsText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
