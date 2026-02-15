import React from "react";
import { Outlet } from "react-router";
import AuthAnimation from "../../Pages/AuthPage/AuthAnimation/AuthAnimation";

const AuthenticationLayout = () => {
  return (
    <div className=" w-11/12 mx-auto md:flex items-center justify-center gap-20">
      <AuthAnimation></AuthAnimation>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthenticationLayout;
