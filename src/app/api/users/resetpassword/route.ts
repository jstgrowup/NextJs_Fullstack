import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
export const POST = async (request: NextRequest) => {
  try {
    const { newpassword, token } = await request.json();
    const foundUser = await User.findOne({
      forgotPasswordToken: token,
      forgotPassowordTokenExpiry: { $gte: new Date().toISOString() },
    });
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newpassword, salt);
    if (!foundUser) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    await User.findOneAndUpdate({ password: hashedPassword });
    foundUser.forgotPasswordToken = undefined;
    foundUser.forgotPassowordTokenExpiry = undefined;
    await foundUser.save();
    return NextResponse.json(
      { message: "Password Succefully changed" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error:", error);
  }
};
