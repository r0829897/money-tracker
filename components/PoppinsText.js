import React from "react";
import { Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

export default PoppinsText = (props) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <Text style={{ fontFamily: "Poppins_400Regular" }} style={props.style}>
          {props.children}
        </Text>
      </View>
    );
  }
};
