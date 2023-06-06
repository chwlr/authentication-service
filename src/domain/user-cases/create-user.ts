import { UserRequestModel, UserResponseModel } from "../models/user"
import { UserRepository } from "../interface/repositories/user-repository"
import { CreateUserUseCase } from "../interface/use-cases/create-user-use-case"
import { Password } from "../../presentation/middlewares/password"

export class CreateUser implements CreateUserUseCase {
  UserRepository: UserRepository
  constructor(UserRepository: UserRepository) {
    this.UserRepository = UserRepository
  }

  async execute(User: UserRequestModel): Promise<UserResponseModel | null> {
    const hashedPassword = await Password.toHash(User.password)
    
    const user = {
      name: User.name,
      email: User.email,
      password: hashedPassword
    }
    const result = await this.UserRepository.createUser(user)
    return result
  }
}