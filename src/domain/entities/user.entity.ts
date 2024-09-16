import { uid } from 'uid'

import { Email } from '../vo'

export class User {
  private $email: Email

  constructor(
    readonly userId: string,
    readonly name: string,
    email: string,
  ) {
    this.$email = new Email(email)
  }

  static create(name: string, email: string) {
    const userId = uid(32)
    return new User(userId, name, email)
  }

  get email() {
    return this.$email.value
  }
}
