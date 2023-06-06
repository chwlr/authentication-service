import { MongoDBUserDataSource } from './data/data-source/mongodb/schema/mongodb-user-data-source'
import { UserRepositoryImpl } from './domain/repositories/user-repository'
import { CreateUser } from './domain/user-cases/create-user'
import { GetUserByEmail } from './domain/user-cases/get-user-by-email'
import { SignInUser } from './domain/user-cases/signin-user'
import UserRouter from './presentation/routers/user-router'
import server from './server'
import mongoose from 'mongoose'

async function getMongoDS() {
  await mongoose.connect('mongodb://auth-mongo-service:27017/auth')
  const connection = mongoose.connection
  connection.once("open", function(){
    console.log("MongoDB database connection established successfully")
  })

  return new MongoDBUserDataSource()
}

(async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  const dataSource = await getMongoDS()

  const UserMiddleware = UserRouter(
    new CreateUser(new UserRepositoryImpl(dataSource)),
    new GetUserByEmail(new UserRepositoryImpl(dataSource)),
    new SignInUser(new UserRepositoryImpl(dataSource))
  )

  server.use("/", UserMiddleware)

  server.listen(3000, () => console.log("Running on http://localhost:3000"))
})()