import * as PasswordValidator from 'password-validator';

export default function validatePassword() {
  const password = process.env.PASSWORD;

  if (!password) {
    throw new Error('Password missing!');
  }

  const schema = new PasswordValidator();

  schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

  if (!schema.validate(password)) {
    throw new Error('Password not strong enough!');
  }
}
