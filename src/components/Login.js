import React, { useState } from "react";
import FormControl from "./Forms/FormControl";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appActions } from "../store/Slices/appSlice";

function Login() {
  const [show, toggleShow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch=useDispatch()
  const navigate=useNavigate()

  function showPassword() {
    toggleShow((status) => !status);
  }

  async function handleLogin() {
  
    const data = {
      email,
      password,
    };
    try {
      let response = await fetch("/auth/login", {
        method: "post",
        body: JSON.stringify({ data }),
        headers: {
          "Content-type": "application/json",
        },
      });

      let res = await response.json();
      
      // localStorage.setItem("user_detail",JSON.stringify(res.data))
      dispatch(appActions.setuserDetail(res.data))




      navigate("/chat");
    } catch (err) {
      console.log("error ", err);
    }
  }

  function handleProfile(e) {}

  return (
    <div className="border h-auto p-4 rounded-lg bg-white ">
      <form onSubmit={(e) => e.preventDefault()}>
        <p className="text-center mb-4 font-bold text-xl">Login</p>

        <FormControl
          name={"email"}
          label="Email"
          type="email"
          value={email}
          handleChange={setEmail}
        ></FormControl>
        <FormControl
          name={"password"}
          label="Password"
          type="password"
          value={password}
          handleChange={setPassword}
        ></FormControl>

        <div className="w-[100%] flex justify-center gap-1 ">
          <button
            className="px-2 py-1 border bg-blue-600 text-white rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>


          <button
            className="px-2 py-1 border bg-blue-600 text-white rounded-md"
          >
           <Link to='/user/signup'> Don't have an account ?</Link>
          </button>
        
        
        </div>
      </form>
    </div>
  );
}

export default Login;
