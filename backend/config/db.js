// import mongoose from "mongoose"

// const connectDb = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL)
//         console.log("db connected")
//     } catch (error) {
//         console.log(error)
//     }
// }
// export default connectDb


import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log("Using existing DB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
    });

    isConnected = db.connection.readyState === 1;
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error.message);
    throw error;
  }
};

export default connectDb;