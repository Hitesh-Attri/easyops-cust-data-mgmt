import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Please define Mongo DB URI");
}

const connectDB = async () => {
  try {
    let conn = await mongoose.connect(MONGODB_URI);
    return conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
};

export default connectDB;
