import { uid } from 'uid'

export class User {
  readonly userId: string

  constructor(
    readonly name: string,
    readonly email: string,
  ) {
    this.userId = uid(32)
  }
}
