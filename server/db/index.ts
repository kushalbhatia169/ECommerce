// db.js
import mongoose from 'mongoose';

const DBAddress = "mongodb+srv://kushalbhatia169:nOd1VNTyPhYTcKaA@cluster0.wm6emj6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: "1" as any, strict: true, deprecationErrors: true } };

export async function connectToDatabase() {
  try {
    await mongoose.connect(DBAddress, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("An error occurred while connecting to MongoDB:", error);
    throw error; // Propagate the error to the caller for further handling
  }
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}
