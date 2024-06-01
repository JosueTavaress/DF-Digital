import bcrypt from 'bcrypt';

const hashPassword = (password: string): string => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

const compare = async (password: string, encrypted: string) => {
  return bcrypt.compare(password, encrypted);
};

export {
  hashPassword,
  compare
}