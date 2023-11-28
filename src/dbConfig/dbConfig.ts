import mongoose from "mongoose";
export async function connect() {
  try {
    console.log("process.env.MONGO_URI!:", process.env.MONGO_URI!);
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    // connection.on("connected", () => {
    //   console.log("mongodb connected");
    // });
    connection.on("error", (err) => {
      console.log("mongo connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("error:", error);
  }
}
