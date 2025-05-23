import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert } from "firebase-admin/app";
import type { Express, RequestHandler, Request, Response, NextFunction } from "express";
import { storage } from "./storage";

// Initialize Firebase Admin SDK
try {
  initializeApp({
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    credential: cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
} catch (error) {
  // App might already be initialized
  console.log("Firebase Admin initialization error (might be already initialized):", error);
}

// Middleware to verify Firebase auth tokens
export const isAuthenticated: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Invalid token format" });
    }
    
    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      req.user = { 
        uid: decodedToken.uid,
        email: decodedToken.email || '',
        displayName: decodedToken.name || ''
      };
      
      // Check if user exists in database, if not create them
      const existingUser = await storage.getUser(decodedToken.uid);
      
      if (!existingUser) {
        await storage.upsertUser({
          id: decodedToken.uid,
          email: decodedToken.email,
          firstName: decodedToken.name ? decodedToken.name.split(' ')[0] : undefined,
          lastName: decodedToken.name ? decodedToken.name.split(' ').slice(1).join(' ') : undefined,
          profileImageUrl: decodedToken.picture,
        });
      }
      
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal server error during authentication" });
  }
};

// User type extensions for Express
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
        displayName: string;
      };
    }
  }
}