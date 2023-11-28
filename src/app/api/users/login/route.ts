import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password, username } = reqBody;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return NextResponse.json({ error: "User does not exist" });
    }
    const validPassword = await bcryptjs.compare(password, foundUser.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid User" });
    }
    // token creation
    const tokenData = {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    };
    const token: any = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
