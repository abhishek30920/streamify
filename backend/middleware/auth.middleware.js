import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  try {
    await clerkClient.authenticateRequest(req, { authorizedParties: [process.env.URL] });
    
    if (!req.auth.userId) {
      return res.status(401).json({ message: "Unauthorized - you must be logged in" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export const reqadmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthorized - you must be an admin" });
    }

    next();
  } catch (error) {
    next(error);
  }
};