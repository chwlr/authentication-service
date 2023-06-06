import { UserResponseModel } from "../../models/user"

export interface SignInUserUseCase {
  execute(email: String, password: String): Promise<UserResponseModel | Error>
}