import React from "react";
import { StyleSheet } from "react-native";

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
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleContent: {
    color: "white",
    fontSize: 15,
  },
  contentContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#202141",
    borderRadius: 10,
    width: 250,
    height: 40,
    marginBottom: 15,
    padding: 9,
    color: "white",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#202141",
  },
  button: {
    overflow: "hidden",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSecondary: {
    flexBasis: 80,
    marginRight: 10,
    backgroundColor: "#3D3E5C",
  },
  buttonSecondaryText: { color: "#9697AF" },
  buttonPrimary: { borderWidth: 1, borderColor: "#FFA800", flexBasis: 80 },
  buttonPrimaryText: { color: "white" },
  infoText: {
    fontSize: 12,
    color: "#BAADAD",
    textAlign: "center",
  },
});

export default styles;
