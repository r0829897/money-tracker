import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import MainCard from "./components/MainCard";
import MonthlySaldo from "./components/MonthlySaldo";
import Payments from "./components/Payments";
import AddButton from "./components/AddButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_SERVER } from "./config";

export default function App() {
  const [user, setUser] = useState({ payments: [] });
  const [errorMessage, setErrorMessage] = useState(null);

  const nextMonth = (month) => {
    if (!user._id) {
      console.log("No user while calling 'nextMonth()'");
      return 1;
    }

    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth === month)
      console.log(`Still in the same month: ${month}, ${currentMonth}`);
    else
      axios
        .put(`${URL_SERVER}api/currentMonth/${user._id}`, { currentMonth })
        .then((res) => {
          setUser(res.data);
          console.log(
            `Updated the current month from ${month} -> ${currentMonth}.\n User data:`
          );
          console.log(res.data);

          axios
            .put(`${URL_SERVER}api/currentSaldo/${user._id}`, {
              currentSaldo: user.currentSaldo + user.monthlySaldo,
            })
            .then((res) => {
              setUser(res.data);
              console.log(
                `Changed current saldo to: ${res.data.currentSaldo}\n`
              );
            })
            .catch((err) =>
              console.log(`Error while changing current saldo: ${err}\n`)
            );
        })
        .catch((err) => {
          setErrorMessage(err);
          console.log(
            `Error while trying to update the current month: ${errorMessage}`
          );
        });
  };

  const loadUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");

      if (!id) {
        axios
          .get(`${URL_SERVER}api/init`)
          .then((res) => {
            setUser(res.data);
            AsyncStorage.setItem("id", res.data._id);
            console.log(
              `No id found in local storage.\n Initialized new user:`
            );
            console.log(res.data);
          })
          .catch((err) => {
            setErrorMessage(err.message);
            console.log(
              `Error while initializing a new user.\n ${errorMessage}\n`
            );
          });
      } else {
        axios
          .get(`${URL_SERVER}api/user/${id}`)
          .then((res) => {
            setUser(res.data);
            console.log(
              `Id found in local storage: ${res.data._id}.\n User data:`
            );
            console.log(res.data);
          })
          .catch((err) => {
            setErrorMessage(err.message);
            console.log(
              `Error while fetching a existing user.\n ${errorMessage}\n`
            );
          });
      }
    } catch (err) {
      console.log(`Error while getting id in local storage: ${err}`);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    nextMonth(user.currentMonth);
  }, [user.currentMonth]);

  return (
    <View style={styles.container}>
      <MonthlySaldo
        monthlySaldo={user.monthlySaldo}
        onPress={setUser}
        userId={user._id}
      />
      <MainCard
        currentSaldo={user.currentSaldo}
        user={user}
        onPress={setUser}
      />
      <Payments payments={user.payments} />
      <AddButton onPress={setUser} user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 46,
    paddingRight: 46,
    paddingTop: 55,
    flex: 1,
    backgroundColor: "#01021B",
  },
});
