import { container } from 'tsyringe'

import { UserRepositoryMemory } from '../repositories/memory'

container.registerSingleton('userRepository', UserRepositoryMemory)

export default container
