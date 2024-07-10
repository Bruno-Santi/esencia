import * as bcrypt from 'bcrypt';

export const passwordCompare = async (
  rawPassword: string,
  encodedPasswordDB: string,
) => {
  if (!rawPassword || !encodedPasswordDB) {
    throw new Error(
      'Both rawPassword and encodedPasswordDB are required for comparison',
    );
  }

  console.log('Raw Password:', rawPassword);
  console.log('Encoded Password from DB:', encodedPasswordDB);

  try {
    const passwordValid = await bcrypt.compare(rawPassword, encodedPasswordDB);
    console.log('Password valid:', passwordValid);

    return passwordValid;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};
