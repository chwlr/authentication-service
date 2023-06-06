import { CustomError } from "../../presentation/helper/error-handler";
import { UserRepository } from "../interface/repositories/user-repository";
import { GetUserByEmailUseCase } from "../interface/use-cases/get-user-by-email-use-case";
import { UserResponseModel } from "../models/user";

export class GetUserByEmail implements GetUserByEmailUseCase {
  UserRepository: UserRepository
  constructor(UserRepository: UserRepository) {
    this.UserRepository = UserRepository
  }

  async execute(email: String): Promise<UserResponseModel | Error> {
    const result = await this.UserRepository.getUserByEmail(email)
    return result
  }
}