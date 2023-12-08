"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Profile() {
  const router = useRouter();
  const [user, setuser] = useState("");
  
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout succeful");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const getUserDetails = async () => {
    try {
      let user = await axios.get("/api/users/me");
      if (user) {
        setuser(user?.data?.data?._id);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <div>
      <h1>Profile</h1>
      <h1>
        {user === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${user}`}>Go to detail page</Link>
        )}
      </h1>
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GET User
      </button>
    </div>
  );
}
