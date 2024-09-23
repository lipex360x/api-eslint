import { Hono } from 'hono'

import {
  CreateUserController,
  DeleteUserController,
  ListUsersController,
  ShowUserController,
  UpdateUserController,
} from '../controllers'
import { validateSchema } from '../middlewares'
import { createUserSchema } from '../schemas'

const userRoutes = new Hono()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const showUserController = new ShowUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

userRoutes.post('/', validateSchema(createUserSchema), createUserController.handle)
userRoutes.get('/', listUsersController.handle)
userRoutes.get('/:id', showUserController.handle)
userRoutes.put('/:id', updateUserController.handle)
userRoutes.delete('/:id', deleteUserController.handle)

export { userRoutes }
