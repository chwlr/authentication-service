import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserResponseModel } from '../../domain/models/user'

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserResponseModel
    }
  }
}

export const sessionValidate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return res.status(401).json({ status: "failed", message: "Not authorized" })
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserResponseModel
    req.currentUser = payload
    res.status(200).json({ status: "success", data: req.currentUser })
  } catch (error) {
    res.status(500).json({ status: "failed", message: "invalid signature" })
  }

  next()
}