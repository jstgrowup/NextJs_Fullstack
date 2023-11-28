"use client";
//
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setuser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setloading] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const onSignup = async () => {
    try {
      setloading(true);
      let reponse = await axios.post("/api/users/signup", user);
      // router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div className="px-10 py-10 border border-solid border-gray-900 flex flex-col items-center justify-center min-h-screen">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-500"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
        onClick={onSignup}
        // disabled={buttonDisabled}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {buttonDisabled ? "Sign In" : "Signup"}
      </button>
      <Link href="/login">Visit Login</Link>
    </div>
  );
}
