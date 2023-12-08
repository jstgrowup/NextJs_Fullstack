"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
function VerifyEmail() {
  const router = useRouter();
  const tokenParam = useSearchParams();
  const urlToken = tokenParam.get("token");
  const [token, settoken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);
  const verifyUserEmail = async () => {
    try {
      let response = await axios.post("/api/users/verifyemail", {
        token: token,
      });

      router.push("/resetpassword");
      setverified(true);
    } catch (error: any) {
      console.log("error:", error.response);
      seterror(true);
    }
  };
  useEffect(() => {
    settoken(urlToken!);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl ">verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500">Error</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
