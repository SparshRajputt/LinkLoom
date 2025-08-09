import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("Connected to MongoDB");
    } catch (e) {
        console.log(e);
    }
};
connectDB();

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

const contentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const Content = mongoose.model("Content", contentSchema);

const linkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    hash: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    share: { type: Boolean, default: false },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // Default to 7 days from now
})
const Link = mongoose.model("Link", linkSchema);


export {User, Content, Link};