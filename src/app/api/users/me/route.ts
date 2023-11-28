import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();
export const GET = async (request: NextRequest) => {
  try {
    let userFromToken: any = await getDataFromToken(request);
    let user = await User.findOne({ _id: userFromToken?.id }).select(
      "-password"
    );
    return NextResponse.json({
      message: "User Found",
      data: user,
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
