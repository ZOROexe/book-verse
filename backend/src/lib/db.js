import mongoose from "mongoose";

export const connDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`Database connected ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in connection with db", error);
  }
};
