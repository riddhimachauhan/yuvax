// src/types/express.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        role: string;
        [key: string]: any; // optional for extra fields
        user_id: string;    
        email: string;        
        full_name?: string;   

      };
    }
  }
}
