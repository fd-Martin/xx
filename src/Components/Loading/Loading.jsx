import React from "react";
import { Audio } from "react-loader-spinner";

const Loading = () => {
  return (
    <Audio
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
    />
  );
};

export default Loading;