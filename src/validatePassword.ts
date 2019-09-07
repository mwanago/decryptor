import * as passwordValidator from 'password-validator';

export default function validatePassword() {
  const password = process.env.PASSWORD;
  const schema = new passwordValidator();

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
