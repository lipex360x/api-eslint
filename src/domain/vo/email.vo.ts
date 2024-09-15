import * as EmailValidator from 'email-validator'

export class Email {
  value: string

  constructor(email: string) {
    if (!EmailValidator.validate(email)) throw new Error('invalid email')
    this.value = email
  }
}
