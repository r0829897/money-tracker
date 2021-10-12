import axios from "axios";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Alert,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import PoppinsText from "./PoppinsText";
import { URL_SERVER } from "../config";

export default CurrentSaldo = ({ currentSaldo, onPress, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, onChangeInput] = useState("");

  const handlePress = () => {
    axios
      .post(`${URL_SERVER}api/currentSaldo/${userId}`, {
        currentSaldo: Number(input),
      })
      .then((res) => {
        onPress(res.data);
        console.log(`Changed current saldo to: ${res.data.currentSaldo}\n`);
      })
      .then((err) =>
        console.log(`Error while changing current saldo: ${err}\n`)
      );
    onChangeInput("");
  };

  return (
    <Pressable style={styles.container} onPress={() => setModalVisible(true)}>
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
                  backgroundColor: "#011E06",
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

      <PoppinsText style={styles.title}>Current saldo:</PoppinsText>
      <PoppinsText style={styles.currentSaldo}>{`€${
        Math.round(currentSaldo * 100) / 100 // round to 2 decimal places
      }`}</PoppinsText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#011E06",
    padding: 24,
  },
  title: {
    color: "white",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 3.12,
  },
  currentSaldo: {
    color: "white",
    fontSize: 44,
    letterSpacing: 3.12,
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
    backgroundColor: "#011E06",
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
