// lib/dbConnect.js
import mongoose from "mongoose";

let isConnected = false; // global connection state

const dbConnect = async () => {
  if (isConnected) {
    return; // ✅ Already connected
  }

  try {
    const db = await mongoose.connect(`mongodb://localhost:27017/chai`, {
      dbName: "get-me-a-chai", // Optional: name of your MongoDB database
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    ("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default dbConnect;
