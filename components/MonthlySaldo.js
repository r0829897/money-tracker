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

export default MonthlySaldo = ({ monthlySaldo, onPress, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, onChangeInput] = useState("");

  const handlePress = () => {
    axios
      .post(`${URL_SERVER}api/monthlySaldo/${userId}`, {
        monthlySaldo: Number(input),
      })
      .then((res) => {
        onPress(res.data);
        console.log(`Changed monthly saldo to: ${res.data.monthlySaldo}\n`);
      })
      .catch((err) =>
        console.log(`Error while changing monthly saldo: ${err}\n`)
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
                Edit monthly saldo
              </PoppinsText>
            </View>
            <View style={styles.contentContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={onChangeInput}
                placeholder="Enter new monthly saldo..."
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
                  backgroundColor: "#9CA69D",
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

      <PoppinsText style={styles.title}>Monthly saldo:</PoppinsText>
      <PoppinsText style={styles.monthlySaldo}>{`€${
        Math.round(monthlySaldo * 100) / 100
      }`}</PoppinsText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9CA69D",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    color: "white",
    fontSize: 12,
    letterSpacing: 3.12,
  },
  monthlySaldo: {
    color: "#FFA800",
    letterSpacing: 3.12,
    marginLeft: 10,
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
    backgroundColor: "#9CA69D",
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
