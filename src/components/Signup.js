import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormControl from "./Forms/FormControl";
import { Link } from "react-router-dom";

function Signup() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");

  const navigate = useNavigate();

  async function signUp() {
    const data = {
      name,
      email,
      pic,
      password,
    };

    console.log("data ", data);
    try {

      let response = await fetch("http://localhost:3000/auth/register", {
        method: "post",
        body: JSON.stringify({data }),
        headers:{
          "Content-type":"application/json"
        }
      });

      let res=await response.json()
      localStorage.setItem('access_token',res.data.token)
      console.log("frontend ",res.data.token);

      navigate("/user/login");
    } catch (err) {
      console.log("error ", err);
    }
  }

  async function handleProfile(pic) {
    setPic(pic);
    console.log("pic ", pic);

    if (pic.type == "image/jpeg" || pic.type == "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "esakki");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/esakki/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const result = await res.json();
        console.log("result ", result);
      } catch (e) {
        console.log("error ", e);
      }
    }
  }

  return (
    <div className="border h-auto p-4 rounded-lg bg-white">
      <form onSubmit={(e) => e.preventDefault()}>
        <p className="text-center mb-4 font-bold text-xl">SignUp</p>
        <FormControl
          name={"name"}
          label="Name"
          type="text"
          value={name}
          handleChange={setName}
        ></FormControl>
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
        <FormControl
          name={"pic"}
          label="Pic"
          type="file"
          value={pic}
          handleChange={handleProfile}
        ></FormControl>

        <div className="w-[100%] flex justify-center ">
          <button
            className="px-2 py-1 border bg-blue-600 text-white rounded-md"
            onClick={signUp}
          >
           SignUp
          </button>

          <button className="px-2 py-1 border bg-blue-600 text-white rounded-md">
            <Link to="/user/login">Already have an account?</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
