import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import { CustomError } from '../helper/error-handler'
import { userSignupRules, userSigninRules,validate } from '../middlewares/validator'
import { CreateUserUseCase } from '../../domain/interface/use-cases/create-user-use-case'
import { GetUserByEmailUseCase } from '../../domain/interface/use-cases/get-user-by-email-use-case'
import { SignInUserUseCase } from '../../domain/interface/use-cases/sigin-user-use-case'
import { sessionValidate } from '../middlewares/session-validate'
import { requireAuth } from '../middlewares/require-auth'

export default function UserRouter(
  createUserUseCase: CreateUserUseCase,
  getUserByEmailUseCase: GetUserByEmailUseCase,
  signInUserUseCase: SignInUserUseCase
) {
  const router = express.Router()

  router.post('/api/users/signin', userSigninRules(), validate, async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
      const user = await signInUserUseCase.execute(email, password)
      if (!(user instanceof Error)) {
        const userJwt = jwt.sign({
          id: user?.id,
          name: user?.name,
          email: user?.email,
        }, process.env.JWT_KEY!)

        req.session = {
          jwt: userJwt
        }
        res.status(200)
        res.json({ status: "success", message: "Sign In Successfully", data: user })
      }else {
        res.status(400).json({ status: "failed", message: user.message })
      }

    } catch (error) {
      res.status(500).send({ status: "failed", message: "Error while signing" })
    }

  })

  router.post('/api/users/signup', userSignupRules(), validate, async (req:Request, res: Response) => {
    const {email} = req.body
    try {
      const result = await getUserByEmailUseCase.execute(email)
      if (!(result instanceof CustomError)) {
        res.status(400).json({ status: "failed", message: "Email already in used" })
      }else {
        const createdUser = await createUserUseCase.execute(req.body)
        const userJwt = jwt.sign({
          id: createdUser?.id,
          name: createdUser?.name,
          email: createdUser?.email,
        }, process.env.JWT_KEY!)

        req.session = {
          jwt: userJwt
        }

        res.status(201)
        res.json({ status: "success", message: "User Created Successfully", data: createdUser })
      }
    } catch (error) {
      res.status(500).send({ status: "failed", message: "Error saving data" })
    }
  })

  router.get('/api/users/user/:email', sessionValidate, requireAuth, async (req: Request, res: Response) => {
    try {
      const result = await getUserByEmailUseCase.execute(req.params.email)
      if (!(result instanceof CustomError)) {
        res.status(200).json({ status: "success", data: result })
      }else {
        res.status(400).json({ status: "failed", message: result.getErrorMessage() })
      }
    } catch (error) {
      console.log(error)
    }
  })

  router.get('/api/users/currentuser', sessionValidate, requireAuth, (req: Request, res: Response) => {
    res.status(200).json({ status: "success", data: req.currentUser })
  })

  router.get('/api/users/signout', (req: Request, res: Response) => {
    req.session = null
    res.status(200).json({ status: "success", message: "successfully signout" })
  })

  return router
}