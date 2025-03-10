import React, { useState } from "react";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { useAuthContext } from "../context/AuthProvider";

const Register = () => {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { createUser, googleProvider } = useAuthContext();
  const handleChange = (e) =>
    setInfo({ ...info, [e.target.name]: e.target.value });

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = `${info.firstName} ${info.lastName}`
    createUser(info.email, info.password, displayName);
  };
  return (
    <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
      <div
        className={`mt-[3vh] mx-auto overflow-hidden relative w-[380px] h-[560px] rounded-[8px] dark:bg-[#1c1c1c] before:content-[""] before:absolute before:w-[380px] before:h-[420px] before:top-[-50%] before:left-[-50%] after:content-[""] after:absolute after:w-[380px] after:h-[420px] after:top-[-50%] after:left-[-50%] custom-linear-gradient`}
      >
        <form
          onSubmit={handleSubmit}
          className="absolute inset-[2px] rounded-[8px] bg-gray-100 dark:bg-[#28292d] z-[10] flex flex-col py-[50px] px-[40px]"
        >
          <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
            Sign Up
          </h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="peer"
              name="firstName"
              type="text"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label htmlFor="floating_text">First Name</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="peer"
              name="lastName"
              type="text"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label htmlFor="floating_text">Last Name</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="peer"
              name="email"
              type="email"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label htmlFor="floating_email">Email</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              className="peer"
              name="password"
              type="password"
              placeholder=" "
              required
              onChange={handleChange}
            />
            <label htmlFor="floating_password">Password</label>
          </div>
          <button type="submit" className="btn-danger">
            Register
          </button>
          <button
          onClick={()=> googleProvider()}
            type="button"
            className="btn-danger flex justify-between items-center"
          >
            Continue with Google
            <GoogleIcon color="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
