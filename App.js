import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MainCard from "./components/MainCard";
import MonthlySaldo from "./components/MonthlySaldo";
import Payments from "./components/Payments";
import AddButton from "./components/AddButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_SERVER } from "./config";

export default function App() {
  const [user, setUser] = useState({ payments: [] });

  const nextMonth = async (month) => {
    if (!user._id) {
      console.log("No user while calling 'nextMonth()'");
      return 1;
    }

    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth === month)
      console.log(`Still in the same month: ${month}, ${currentMonth}`);
    else {
      try {
        await axios.put(`${URL_SERVER}api/currentMonth/${user._id}`, {
          currentMonth,
        });
        const res = await axios.put(
          `${URL_SERVER}api/currentSaldo/${user._id}`,
          {
            currentSaldo: user.monthlySaldo,
          }
        );
        setUser(res.data);
        console.log(
          `Updated the current month from ${month} -> ${currentMonth}. And changed current saldo to: ${res.data.currentSaldo}\n`
        );
      } catch (err) {
        console.log(`Error while trying to update the current month: ${err}`);
      }
    }
  };

  const loadUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");

      if (!id) {
        const res = await axios.get(`${URL_SERVER}api/init`);
        setUser(res.data);
        AsyncStorage.setItem("id", res.data._id);
        console.log(`No id found in local storage.\n Initialized new user:`);
        console.log(res.data);
      } else {
        const res = await axios.get(`${URL_SERVER}api/user/${id}`);
        setUser(res.data);
        console.log(`Id found in local storage: ${res.data._id}.\n User data:`);
        console.log(res.data);
      }
    } catch (err) {
      console.log(`Error while loading user: ${err}`);
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
        userId={user._id}
        onPress={setUser}
      />
      <MainCard
        currentSaldo={user.currentSaldo}
        user={user}
        onPress={setUser}
      />
      <Payments
        payments={user.payments}
        onPress={setUser}
        id={user._id}
        currentSaldo={user.currentSaldo}
      />
      <AddButton user={user} onPress={setUser} />
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
