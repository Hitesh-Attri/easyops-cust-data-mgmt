// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(conn.connection.host);
//   } catch (error) {
//     console.log(error.message);
//     process.exit();
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("Please define Mongo DB URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    // console.log(cached.conn.connection.host, "-->cached.conn.connection.host");
    return cached.conn;
  }

  if (!cached.promise) {
    // const opts = {
    //   bufferCommands: false,
    // };

    cached.promise = await mongoose.connect(MONGODB_URI).then((mongoose) => {
      // console.log(mongoose, "mongoose");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // console.log("herre");

  return cached.conn;
};

export default connectDB;
