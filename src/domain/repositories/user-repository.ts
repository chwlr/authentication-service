import { UserDataSource } from "../../data/data-source/interface/data-source/user-data-source"
import { UserRequestModel, UserResponseModel } from "../models/user"
import { UserRepository } from "../interface/repositories/user-repository"
import { CustomError } from "../../presentation/helper/error-handler"

export class UserRepositoryImpl implements UserRepository {
  UserDataSource: UserDataSource
  constructor(UserDataSource: UserDataSource) {
    this.UserDataSource = UserDataSource
  }

  async createUser(User: UserRequestModel): Promise<UserResponseModel | null> {
    const result = await this.UserDataSource.create(User)
    return result
  }

  async getUserByEmail(email: String): Promise<UserResponseModel | Error> {
    const result = await this.UserDataSource.getOne(email)
    return result
  }
}