import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert } from "firebase-admin/app";
import type { Express, RequestHandler, Request, Response, NextFunction } from "express";
import { storage } from "./storage";

// Initialize Firebase Admin SDK with application default credentials or project ID only
try {
  // If Firebase service account credentials are not available
  // we'll initialize with just the project ID
  // This will still allow us to set up the middleware, though token verification
  // will need to be handled differently in that case
  initializeApp({
    projectId: process.env.VITE_FIREBASE_PROJECT_ID
  });
  console.log("Firebase Admin initialized with project ID only");
} catch (error) {
  // App might already be initialized
  console.log("Firebase Admin initialization info:", error);
}

// For development purposes only: Simple middleware that assumes authentication
export const isAuthenticated: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For development: Get user ID from either auth header or query param for testing
    let userId: string | undefined;
    
    // Try to extract from Authorization header if it exists
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      if (token) {
        try {
          // In production, this would verify the token with Firebase Admin
          // For now, we're extracting the user ID from the token or query parameter
          const decodedToken = await getAuth().verifyIdToken(token).catch(() => null);
          if (decodedToken) {
            userId = decodedToken.uid;
          }
        } catch (verifyError) {
          console.log("Token verification skipped:", verifyError);
        }
      }
    }
    
    // Fallback to user ID from query parameter (FOR DEVELOPMENT ONLY)
    if (!userId && req.query.userId) {
      userId = req.query.userId as string;
    }
    
    // If no user ID by now, reject the request
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - No valid user ID" });
    }
    
    // Set the user object on the request
    req.user = { 
      uid: userId,
      email: 'user@example.com', // Placeholder, would come from token in production
      displayName: 'User' // Placeholder, would come from token in production
    };
    
    // Check if user exists in database, if not create them
    try {
      const existingUser = await storage.getUser(userId);
      
      if (!existingUser) {
        await storage.upsertUser({
          id: userId,
          email: req.user.email,
          firstName: req.user.displayName,
          lastName: '',
          profileImageUrl: '',
        });
      }
    } catch (error) {
      console.log("Note: User check skipped:", error);
      // Continue anyway - this may happen during development
    }
    
    // Continue to the protected route
    next();
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