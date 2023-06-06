import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

export const userSignupRules = () => {
  return [
    body('name', 'name must no be empty').notEmpty(),
    body('email', 'Must be a valid e-mail address').isEmail(),
    body('password', 'The password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character').isLength({min: 8}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
  ]
}

export const userSigninRules = () => {
  return [
    body('email', 'Must be a valid e-mail address').isEmail(),
    body('password', 'The password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character').isLength({min: 8}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
  ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req).mapped()

  if(Object.keys(result).length === 0 ) {
    return next()
  }

  return res.status(422).json({
    status: "failed", errors: result
  })
}
