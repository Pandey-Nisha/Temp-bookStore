import mongoose from "mongoose";

export async function connectMongo() {
    try {
        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/bookStore");
        console.log('Connected to MongoDB');
        return connect;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}