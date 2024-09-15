import { uid } from 'uid'

import { Email } from '../vo'

export class User {
  readonly userId: string
  private $email: Email

  constructor(
    readonly name: string,
    email: string,
  ) {
    this.$email = new Email(email)
    this.userId = uid(32)
  }

  get email() {
    return this.$email.value
  }
}
