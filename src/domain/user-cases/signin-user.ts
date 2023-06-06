import { CustomError } from "../../presentation/helper/error-handler";
import { Password } from "../../presentation/middlewares/password";
import { UserRepository } from "../interface/repositories/user-repository";
import { SignInUserUseCase } from "../interface/use-cases/sigin-user-use-case";
import { UserResponseModel } from "../models/user";

export class SignInUser implements SignInUserUseCase {
  UserRepository: UserRepository
  constructor(UserRepository: UserRepository) {
    this.UserRepository = UserRepository
  }

  async execute(email: string, password: string): Promise<UserResponseModel | Error> {
    const user = await this.UserRepository.getUserByEmail(email)
    if (!(user instanceof Error)) {
      const passwordMatch = await Password.compare(
        user.password!,
        password
      )
      if (!passwordMatch) {
        return new CustomError("Invalid Credentials")
      }

      const result = {
        id: user.id,
        name: user.name,
        email: user.email
      }

      return result
    } else {
      return new CustomError("Please check your email and password")
    }

  }
}