import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Title from "./components/Title";
import MainCard from "./components/MainCard";
import Payments from "./components/Payments";
import AddButton from "./components/AddButton";
import axios from "axios";
import { URL_SERVER } from "./config";

export default function App() {
  const [user, setUser] = useState({ payments: [] });
  const [errorMessage, setErrorMessage] = useState(null);

  const load = (id) => {
    if (!id) {
      axios
        .get(`${URL_SERVER}api/init`)
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          console.log(errorMessage);
        });
    } else {
      axios
        .get(`${URL_SERVER}api/user/${id}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
      console.log(user);
    }
  };

  useEffect(() => {
    /* JUST FOR DEV PURPOSES */
    load("6164849c9efeae4e9d0aeecd");
    /* */
  }, []);

  return (
    <View style={styles.container}>
      <Title />
      <MainCard
        currentAmount={user.currentAmount}
        monthlyAmount={user.monthlyAmount}
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
  },
});
