import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqbody = await request.json();
    const { email } = reqbody;
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json(
      { message: "Email sent successfully please check you email" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
