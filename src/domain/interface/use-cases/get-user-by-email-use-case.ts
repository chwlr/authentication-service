import { UserResponseModel } from "../../models/user"

export interface GetUserByEmailUseCase {
  execute(email: String): Promise<UserResponseModel | Error>
}