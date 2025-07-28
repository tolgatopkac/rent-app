import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (allowedRules: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        message: "Unauthorized: No token provided",
      });
      return;
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken;
      const userRole = decoded["custom:role"] || "";
      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRules.includes(userRole.toLocaleLowerCase());
      if (!hasAccess) {
        res.status(403).json({
          message: "Forbidden: You do not have access to this resource",
        });
        return;
      }
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({
        message: "Unauthorized: Invalid token",
      });
      return;
    }

    next();
  };
};
