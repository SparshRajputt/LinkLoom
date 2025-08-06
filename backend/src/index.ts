import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User, Content, ShareContent } from "./db.js";
import dotenv from "dotenv";
import { userMiddleware } from "./middleware.js";
dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error: any) {
    console.error("Error during signup:", error);
    if (error.code === 11000) {
      return res.status(409).json({ message: "User already exists." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Both fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Signin Successful",
      token: token,
    });
  } catch (error: any) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { title, content, createdAt } = req.body;

    if (!req.body.userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    await Content.create({
      userId: req.body.userId,
      title,
      content,
      createdAt: createdAt || new Date(),
    });

    res.status(201).json({
      message: "Content created successfully",
    });
  } catch (error: any) {
    console.log("Error creating content: ", error);
    return res.status(500).json({ message: "internal server error" });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const content = await Content.find({ userId: req.body.userId }).populate(
      "userId",
      "firstName lastName"
    );
    res.status(200).json(content);
  } catch (error) {
    console.log("Error fetching content:", error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.delete("/api/v1/content/", userMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({ message: "Content ID is required" });
    }

    const deletedContent = await Content.findOneAndDelete({
      userId: req.body.userId,
      _id: contentId,
    });
    if (!deletedContent) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.log("Error deleting content:", error);
    res.status(500).json({ message: "internal servor error" });
  }
});

app.post("/api/v1/brain/share", async (req, res) => {
  try {
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({ message: "Content ID is required" });
    }

    const contentExists = Content.findById(contentId);
    if (!contentExists) {
      return res.status(404).json({ message: "Content not found" });
    }

    const shareLink = `https://brain.com/share/${contentId}`;

    const existingShare = await ShareContent.findOne({ contentId });
    if (existingShare) {
      return res.status(409).json({ message: "Share link already exists" });
    }

    await ShareContent.create({ contentId, shareLink });
    res.status(201).json({
      message: "Share link created successfully",
      shareLink: shareLink,
    })
  } catch (error) {
    console.log("Error creating share link: ", error);
    return res.status(500).json({ message: "internal server error" });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {

  try{
    const { shareLink } = req.params;

    const fullShareLink = `https://brain.com/share/${shareLink}`;

    const shareContent = await ShareContent.findOne({ shareLink: fullShareLink })

    if(!shareContent) {
      return res.status(404).json({ message: "Share link not found" });
    }

    const content = await Content.findById(shareContent.contentId).populate("userId", "firstName LastName");

    if(!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.status(200).json({
      title: content.title,
      content: content.content,
      createdAt: content.createdAt,
      author: content.userId,
    });
    
  } catch (error: any){
    console.log("Error fetching share link:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

  
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
