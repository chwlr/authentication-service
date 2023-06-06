import { UserRequestModel, UserResponseModel } from "../../../../domain/models/user"
import { CustomError } from "../../../../presentation/helper/error-handler"
import { UserDataSource } from "../../interface/data-source/user-data-source"
import userModel from "./user-schema"

export class MongoDBUserDataSource implements UserDataSource {
  async create(User: UserRequestModel): Promise<UserResponseModel | null> {
    const result = await new userModel(User).save()
    const data =  {
      id: result._id,
      name: result.name,
      email: result.email
    }
    return data
  }

  async getOne(email: String): Promise<UserResponseModel | Error> {
    const result = await userModel.findOne({email: email})
    if (result) {
      return {
        id: result.id,
        name: result.name,
        email: result.email,
        password: result.password
      };
    } else {
      return new CustomError('User not found');
    }
  }
}