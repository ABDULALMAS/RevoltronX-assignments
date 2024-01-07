import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = "testing";

interface AuthRequest extends Request {
  userId?: string;
}

const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const isCustomAuth = token ? token.length < 500 : false;

    let decodedData: JwtPayload | null;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret) as JwtPayload;
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token as string) as JwtPayload;
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;
