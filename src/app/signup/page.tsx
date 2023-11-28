"use client";
//
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Signup() {
  const [user, setuser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const onSignup = async () => {};
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
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Signup
      </button>
      <Link href="/login">Visit Login</Link>
    </div>
  );
}
