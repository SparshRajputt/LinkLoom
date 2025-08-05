import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }
    catch (e) {
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
const shareSchema = new mongoose.Schema({
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
        required: true,
    },
    shareLink: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});
const ShareContent = mongoose.model("ShareContent", shareSchema);
export { User, Content, ShareContent };
//# sourceMappingURL=db.js.map