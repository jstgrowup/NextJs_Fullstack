"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const tokenParam = useSearchParams();
  const urlToken = tokenParam.get("token");
  const [password, setPassword] = useState("");
  const [token, settoken] = useState("");
  const resetPassword = async () => {
    try {
      const response = await axios.post("/api/users/resetpassword", {
        newpassword: password,
        token: token,
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    settoken(urlToken!);
  }, []);

  return (
    <div className="px-10 py-10 border border-solid border-gray-900 flex flex-col items-center justify-center min-h-screen">
      <h1 className="">Reset Password</h1>
      <input
        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button
        onClick={resetPassword}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
};
export default ResetPassword;
