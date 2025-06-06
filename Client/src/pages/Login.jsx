import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setisDataSubmitted] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (currState === "Sign Up" && !isDataSubmitted) {
      setisDataSubmitted(true);
      return;
    }
    const success = await login(currState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio
    });
    
    if(success) {
    navigate("/"); 
  }

  };

  return (
    <div className="flex min-h-screen bg-cover items-center p-10 gap-4 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <div className="hidden sm:flex flex-col items-center  gap-4 text-white font-light text-center">
        {/* Left Side Image */}
        <img
          src={assets.chattrix_logo_png}
          alt=""
          className="w-[min(52vw,250px)]"
        />
        <span className="text-3xl font-medium">Chat beyond Limits</span>
      </div>

      {/* Right Side Form */}
      <form
        onSubmit={handleSubmit}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h1 className="text-white text-3xl font-medium flex items-center gap-2 justify-between">
          {currState}
          {isDataSubmitted && (
            <img
              src={assets.arrow_icon}
              alt="arrow"
              className="h-8 cursor-pointer"
              onClick={() => setisDataSubmitted(false)}
            />
          )}
        </h1>

        <div className="flex flex-col gap-6 mt-4">
          {currState === "Sign Up" && !isDataSubmitted && (
            <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                placeholder="Full name"
                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                required
              />
            </div>
          )}

          {!isDataSubmitted && (
            <>
              <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg
                  width="16"
                  height="11"
                  viewBox="0 0 16 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                    fill="#6B7280"
                  />
                </svg>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email id"
                  className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                  required
                />
              </div>

              <div className="flex items-center w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg
                  width="13"
                  height="17"
                  viewBox="0 0 13 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                    fill="#6B7280"
                  />
                </svg>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
                  required
                />
              </div>
            </>
          )}

          {currState === "Sign Up" && isDataSubmitted && (
            <textarea
              rows={4}
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400"
              placeholder="Write a short bio..."
              required
            ></textarea>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-sky-500 hover:opacity-90 transition-opacity"
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {currState === "Sign Up" && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox" required />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {currState === "Sign Up" ? (
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <span
                className="text-indigo-500 font-medium cursor-pointer"
                onClick={() => {
                  setCurrState("Login");
                  setisDataSubmitted(false);
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <span
                className="text-indigo-500 cursor-pointer text-sm font-medium"
                onClick={() => {
                  setCurrState("Sign Up");
                }}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
