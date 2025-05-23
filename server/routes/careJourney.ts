import { Express, Request, Response } from "express";
import { isAuthenticated } from "../firebaseAuth";
import { storage } from "../storage";

export function registerCareJourneyRoutes(app: Express) {
  // Get or create user care journey
  app.get("/api/care-journey", isAuthenticated, async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = req.user.uid;
      console.log("Getting care journey for user:", userId);
      
      // Get the user's care journey
      const journey = await storage.getCareJourney(userId);
      
      if (journey) {
        console.log("Found existing care journey");
        res.json(journey);
      } else {
        console.log("Creating new care journey for user");
        // Create a default journey for new users
        const defaultJourney = {
          userId,
          startDate: new Date().toISOString(),
          currentPhase: "Initial Assessment",
          milestones: [
            {
              type: "appointment",
              title: "Initial Consultation",
              description: "Your first meeting with our care team to discuss your needs.",
              date: new Date().toISOString(),
              completed: true,
              icon: "appointment",
              celebration: true
            },
            {
              type: "assessment",
              title: "Care Assessment",
              description: "Comprehensive evaluation of your care requirements.",
              date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              completed: false,
              icon: "assessment"
            },
            {
              type: "goal",
              title: "Care Plan Creation",
              description: "Development of your personalized care plan.",
              date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
              completed: false,
              icon: "goal"
            },
            {
              type: "achievement",
              title: "First Month Milestone",
              description: "Celebrating one month of successful care service.",
              date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              completed: false,
              icon: "achievement",
              celebration: true
            }
          ]
        };
        
        // Save the default journey
        try {
          const newJourney = await storage.createCareJourney(defaultJourney);
          res.json(newJourney);
        } catch (createError) {
          console.error("Error creating default care journey:", createError);
          // Return the default journey even if saving fails
          res.json(defaultJourney);
        }
      }
    } catch (error) {
      console.error("Error handling care journey request:", error);
      res.status(500).json({ message: "Failed to process care journey request" });
    }
  });
  
  // Update a care journey
  app.patch("/api/care-journey", isAuthenticated, async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = req.user.uid;
      const journeyData = req.body;
      
      // Update the journey
      const updatedJourney = await storage.updateCareJourney(userId, journeyData);
      
      if (updatedJourney) {
        res.json(updatedJourney);
      } else {
        res.status(404).json({ message: "Care journey not found" });
      }
    } catch (error) {
      console.error("Error updating care journey:", error);
      res.status(500).json({ message: "Failed to update care journey" });
    }
  });
  
  // Update a specific milestone in the care journey
  app.patch("/api/care-journey/milestones/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = req.user.uid;
      const milestoneId = parseInt(req.params.id);
      
      console.log(`Updating milestone ${milestoneId} for user ${userId}`);
      
      // Update the milestone
      const result = await storage.updateCareJourneyMilestone(milestoneId, req.body);
      
      if (result) {
        // Get the updated journey to return to the client
        const updatedJourney = await storage.getCareJourney(userId);
        res.json(updatedJourney);
      } else {
        res.status(404).json({ message: "Milestone not found" });
      }
    } catch (error) {
      console.error("Error updating milestone:", error);
      res.status(500).json({ message: "Failed to update milestone" });
    }
  });
}