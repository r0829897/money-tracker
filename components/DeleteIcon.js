import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default DeleteIcon = () => {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.25 10C21.9404 10 22.5 10.5596 22.5 11.25V23.75C22.5 25.8211 20.8211 27.5 18.75 27.5H11.25C9.17893 27.5 7.5 25.8211 7.5 23.75V11.25C7.5 10.5596 8.05964 10 8.75 10H21.25ZM20 12.5H10V23.75C10 24.4404 10.5596 25 11.25 25H18.75C19.4404 25 20 24.4404 20 23.75V12.5ZM11.25 3.75C11.25 3.05964 11.8096 2.5 12.5 2.5H17.5C18.1904 2.5 18.75 3.05964 18.75 3.75V5H23.75C24.4404 5 25 5.55964 25 6.25C25 6.94036 24.4404 7.5 23.75 7.5H6.25C5.55964 7.5 5 6.94036 5 6.25C5 5.55964 5.55964 5 6.25 5H11.25V3.75Z"
        fill="#C01E1E"
      />
    </Svg>
  );
};
