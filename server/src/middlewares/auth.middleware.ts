import { ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validateData = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          message: `${issue.path} is ${issue.message}`,
        }));
        res.status(400).json({
          error: "Invalid Data",
          details: errorMessages,
        });
      } else {
        res.status(500).json({
          error: "Internal server error",
        });
      }
    }
  };
};
