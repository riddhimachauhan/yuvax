import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ✅ Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// JWT payload interface
interface JwtPayload {
  user_id: string;
  role: string;
  email: string;
  full_name?: string;   
  [key: string]: any; // for any additional fields
}

// ✅ Authenticate JWT
// export const authenticate = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {

//   const userId = (req as any).user?.user_id;
  
//   const token = req.headers.authorization?.split("Bearer ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
//     console.log("decoded is :",decoded)
//     req.user = decoded; // Add user info to request
//     next();
//   } catch {
//     res.status(403).json({ message: "Invalid token" });
//   }
// };


export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.cookies?.yuvax_token;

    // console.log("Cookie token:", token,process.env.NODE_ENV=='production');
    console.log("req.cookies is :",req.cookies)
    console.log("req.headers.authorization is :",req.headers.authorization)

    console.log("token is :",token)

    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split("Bearer ")[1];
      console.warn("⚠️ Using Authorization header (deprecated). Please migrate to cookies.");
    }

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "No token provided",
        code: "NO_TOKEN"
      });
    }
  
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    // console.log("✅ Token decoded:", decoded);
    
    // Attach user info to request
    req.user = decoded;
    req.user = {
      user_id: decoded.user_id,      
      email: decoded.email,          
      role: decoded.role,
      full_name: decoded.full_name,
      firstName: decoded.firstName,
      lastName: decoded.lastName
    };
    next();
  } catch (err: any) {
    console.error("❌ Authentication error:", err.message);

    // Token expired
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ 
        success: false,
        message: "Token expired",
        code: "TOKEN_EXPIRED"
      });
    }

    // Invalid token
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ 
        success: false,
        message: "Invalid token",
        code: "INVALID_TOKEN"
      });
    }

    // Other errors
    return res.status(403).json({ 
      success: false,
      message: "Authentication failed",
      error: err.message
    });
  }
};




//  Authorize by roles
export const authorize =
  (roles?: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // If roles array is provided, check if user's role is included
    if (roles && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next();
  };

  