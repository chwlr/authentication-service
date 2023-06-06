import { UserRequestModel, UserResponseModel } from "../../../../domain/models/user"

export interface UserDataSource {
  create(User: UserRequestModel): Promise<UserResponseModel | null> 
  getOne(email: String): Promise<UserResponseModel | Error>
}