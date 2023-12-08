"use client";
import axios from "axios";
import { useState } from "react";
const ForgotPassword = () => {
  const [user, setuser] = useState({
    email: "",
  });
  const forgotPassword = async () => {
    try {
      const respsonse = await axios.post("/api/users/forgotpassword", user);
      console.log(respsonse);
    } catch (error: any) {
      throw error.message;
    }
  };
  return (
    <div className="px-10 py-10 border border-solid border-gray-900 flex flex-col items-center justify-center min-h-screen">
      <h1>Forgot password</h1>
      <hr />

      <input
        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={forgotPassword}
      >
        Send Email
      </button>
    </div>
  );
};
export default ForgotPassword;
