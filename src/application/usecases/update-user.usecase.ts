export class UpdateUserUseCase {
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
