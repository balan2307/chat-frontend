import React from "react";

import Login from "../components/Login";
import SignUp from "../components/Signup";
import { Outlet } from "react-router-dom";

function AuthPage() {
  return (
    <div
      className="home flex justify-center 
    border border-red h-[100vh] auth"
    >
      <div className=" w-[70%] md:w-[40%] mt-10 h-fit">
        <div className="border bg-whiteflex justify-center bg-white p-2 mb-4 rounded-lg">
          <p className="text-center  font-bold text-2xl">Chitchat</p>
        </div>

        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default AuthPage;
