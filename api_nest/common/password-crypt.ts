import * as bcrypt from 'bcrypt';

export const encodePassword = (rawPassword: string) => {
  const SALTN = 10;
  const SALT = bcrypt.genSaltSync(SALTN);

  return bcrypt.hash(rawPassword, SALT);
};
