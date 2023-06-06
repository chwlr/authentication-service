export interface UserRequestModel {
  name: string
  email: string
  password: string
}

export interface UserResponseModel {
  id: string | any 
  name: string
  email: string
  password?: string
}
