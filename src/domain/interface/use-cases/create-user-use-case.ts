import { UserRequestModel, UserResponseModel } from "../../models/user"

export interface CreateUserUseCase {
  execute(User: UserRequestModel): Promise<UserResponseModel | null>
}