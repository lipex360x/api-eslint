import { Hono } from 'hono'

import { DeleteController, GetController, PostController, PutController } from '../controllers'

const baseRoutes = new Hono()

const getController = new GetController()
const postController = new PostController()
const putController = new PutController()
const deleteController = new DeleteController()

baseRoutes.get('/', getController.handle)
baseRoutes.post('/', postController.handle)
baseRoutes.put('/:id', putController.handle)
baseRoutes.delete('/:id', deleteController.handle)

export { baseRoutes }
