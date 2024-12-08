import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET } from "../global";
import { sign } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  username: string;
  role: string;

}
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received:", token); // Log token yang diterima

  if (!token) {
    return res
      .status(403)
      .json({ message: `Access denied. No token provided.` });
  }

  try {
    const secretKey = SECRET || "";
    console.log("Using secret key:", secretKey); // Log secret key
    const decoded = verify(token, secretKey);
    console.log("Decoded token:", decoded); // Log isi token setelah didekode
    req.body.user = decoded as JwtPayload;
    next();
  } catch (error) {
    console.error("Token verification error:", error); // Log detail error
    return res.status(401).json({ message: `Invalid Token.` });
  }
};


export const verifyRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;

    if (!user) {
      return res
        .status(403)
        .json({ message: `No user information available.` });
    }
    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({
          message: `Access denied. Requires one of the following roles: ${allowedRoles.join(
            ", "
          )}`,
        });
    }

    next();
  };
};
