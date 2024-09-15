export class User {
  readonly userId: string

  constructor(
    readonly name: string,
    readonly email: string,
  ) {
    this.userId = 'userId'
  }
}
