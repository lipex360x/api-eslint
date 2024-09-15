export class CreateUserUseCase {
  async execute(input: Input) {
    return {
      name: input.name,
      email: input.email,
    }
  }
}

type Input = {
  name: string
  email: string
}
