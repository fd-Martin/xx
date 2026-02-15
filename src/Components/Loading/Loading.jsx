// import React from "react";
// import animationData from "./JustFlowTeal.json";
// import Lottie from "lottie-react";

// const Loading = () => {
//   return (
//     <div className="flex justify-center ">
//       <Lottie animationData={animationData} loop={true} />
//     </div>
//   );
// };

// export default Loading;


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