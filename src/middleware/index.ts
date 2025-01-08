import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Middleware to handle input errors
export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    // Check if there are any validation errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    // If there are no validation errors, continue with the next middleware
    next();
}