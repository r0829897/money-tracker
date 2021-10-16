import React, { useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Modal,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PoppinsText from "./PoppinsText";
import { URL_SERVER } from "../config";
import { AutoEncryptionLoggerLevel } from "mongodb";

export default AddButton = ({ onPress, user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, onChangeTitle] = useState("");
  const [amount, onChangeAmount] = useState("");

  function resetInput() {
    onChangeTitle("");
    onChangeAmount("");
  }

  function valInput() {
    return title && amount;
  }

  const handlePress = () => {
    if (!valInput()) {
      Alert.alert("Not a valid input");
      return 1;
    }

    let updatedUser = undefined;
    axios
      .post(`${URL_SERVER}api/payments/${user._id}`, {
        title,
        amount,
      })
      .then((res) => {
        updatedUser = res.data;
        axios
          .post(`${URL_SERVER}api/currentSaldo/${user._id}`, {
            currentSaldo: user.currentSaldo + Number(amount),
          })
          .then((res) => {
            updatedUser = res.data;
            onPress(updatedUser);
            resetInput();
            console.log(`Succesfully updated the user.\n New user data:`);
            console.log(updatedUser);
          })
          .catch((err) => {
            console.log(
              `Error while updating the current saldo: ${err.message}`
            );
            return 1;
          });
      })
      .catch((err) => {
        console.log(`Error while updating the payments: ${err.message}`);
        return 1;
      });
  };

  return (
    <View style={styles.container}>
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
              />
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={onChangeAmount}
                placeholder="Amount..."
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
                  backgroundColor: "#36AD4A",
                  flexBasis: 80,
                }}
                onPress={() => {
                  setModalVisible(false);
                  handlePress();
                }}
              >
                <PoppinsText style={{ color: "white" }}>Add</PoppinsText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: "#202141",
        }}
        onPress={() => setModalVisible(true)}
      >
        <PoppinsText style={{ color: "white" }}>Add Payment</PoppinsText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,

    borderWidth: 1,
    borderColor: "blue",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#ede9e8",
  },
  titleContainer: {
    backgroundColor: "#36AD4A",
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#B2B9B3",
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
