import mongoose from 'mongoose';
import { MONGO_URI } from '../utilities/constant'
import { connect } from "mongoose";
const connectDB = async () => {
    try {
        await connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        throw new Error("MongoDB connection error");
    }
}
export {
    connectDB
}