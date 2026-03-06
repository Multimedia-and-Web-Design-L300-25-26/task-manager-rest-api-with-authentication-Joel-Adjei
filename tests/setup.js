import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../src/config/db.js";

dotenv.config({ path: ".env.test" });

let isConnected = false;

// Connect to database before all tests
beforeAll(async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
});

// Clear database after each test file
afterAll(async () => {
  if (mongoose.connection.collections) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
});
