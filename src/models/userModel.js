import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide username"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPassowordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});
const User = mongoose.models.nextusers || mongoose.model("nextusers", userSchema);
export default User;
