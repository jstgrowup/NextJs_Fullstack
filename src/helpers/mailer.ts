import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // created a hashed user
    let mailOptions;
    const hashedTOken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedTOken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
      mailOptions = {
        from: "deysubham999@gmail.com",
        to: email,
        subject:
          emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${hashedTOken}">here</a> to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        } <br> ${process.env.DOMAIN}/verifyemail?token=${hashedTOken} </p>`,
      };
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedTOken,
        forgotPassowordTokenExpiry: Date.now() + 3600000,
      });
      mailOptions = {
        from: "deysubham999@gmail.com",
        to: email,
        subject:
          emailType === "VERIFY" ? "Reset your email" : "Reset your password",
        html: `<p>Click <a href="${
          process.env.DOMAIN
        }/forgot?token=${hashedTOken}">here</a> to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        } <br> ${process.env.DOMAIN}/resetpassword?token=${hashedTOken} </p>`,
      };
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4333015296739a",
        pass: "759936ef83591d",
      },
    });
    return await transport.sendMail(mailOptions!);
  } catch (error: any) {
    console.log("error:", error);
    throw new Error(error.message);
  }
};
