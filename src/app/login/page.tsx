"use client";
import { useState } from "react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("response:", response);
      toast.success("Login success");
      // router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  return (
    <div className="px-10 py-10 border border-solid border-gray-900 flex flex-col items-center justify-center min-h-screen">
      <h1>Login</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        // disabled={buttonDisabled}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {buttonDisabled ? "Login In" : "Signup"}
      </button>
      <Link href="/login">Visit Login</Link>
    </div>
  );
}
