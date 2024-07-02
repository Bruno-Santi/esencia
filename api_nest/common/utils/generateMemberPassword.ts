export const generatePassword = () => {
  let password: string = '';
  const PASSWORD_LENGTH = 6;
  const CHARACTERS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < PASSWORD_LENGTH; i++) {
    password += CHARACTERS.charAt(
      Math.floor(Math.random() * CHARACTERS.length),
    );
  }
  password = password.replace(/(.{4})/g, '$1 ').trim();

  return password;
};

export default generatePassword;
