import { UserRequestModel, UserResponseModel } from "../../models/user"

export interface UserRepository {
  createUser(User: UserRequestModel): Promise<UserResponseModel | null>
  getUserByEmail(email: String): Promise<UserResponseModel | Error>
 }