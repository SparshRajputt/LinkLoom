import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'];
    if (!header) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }
    const token = header.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: "Token is missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if(decoded){
        req.body.userId = (decoded as { userId: string }).userId;
        next();
    }
    else {
        return res.status(401).json({ message: "Invalid token" });
    }
}