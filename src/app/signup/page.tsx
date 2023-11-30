"use client";
//
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

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
    <div className="bg-slate-950 min-h-screen flex items-center justify-center">
      <div className="bg-cyan-100 flex rounded-2xl shadow-lg p-5 max-w-3xl">
        <div className="sm:w-1/2 px-12 flex flex-col justify-center">
          <h2 className="font-bold text-2xl text-[#002D74]">Signup</h2>

          <p className="text-sm mt-4">
            If you are already a part than please login
          </p>
          <div className="flex flex-col gap-3">
            <input
              className="px-5 py-2 w-full mt-8 shadow-lg border border-solid rounded-xl focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setuser({ ...user, username: e.target.value })}
              placeholder="username"
            />

            <input
              className="px-5 py-2 shadow-lg border border-solid rounded-xl focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              placeholder="email"
            />

            <input
              className="px-5 py-2 shadow-lg border border-solid rounded-xl focus:outline-none focus:ring focus:border-blue-500"
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              placeholder="password"
            />
            <button
              onClick={onSignup}
              // disabled={buttonDisabled}
              className="bg-[#002D74] hover:bg-blue-500 text-white font-bold p-2 rounded-xl"
            >
              Signup
            </button>
            <div className="mt-4 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <button
              onClick={() => router.push("/login")!}
              className="bg-[#002D74] hover:bg-blue-500 text-white font-bold p-2 rounded-xl"
            >
              Login
            </button>
          </div>
        </div>
        <div className="w-1/2 rounded-xl sm:block hidden">
          <Image
            className="rounded-2xl "
            width={500}
            height={500}
            src="/login.avif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
