import * as bcrypt from 'bcrypt';

export const passwordCompare = async (
  rawPassword: string,
  encodedPasswordDB: string,
) => {
  const passwordValid = await bcrypt.compareSync(
    rawPassword,
    encodedPasswordDB,
  );

  return passwordValid;
};
