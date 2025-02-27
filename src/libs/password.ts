import { Argon2id } from "oslo/password";

export const hashPassword = async (password: string) => {
  console.log("password " + password);
  const argon2id = new Argon2id();
  const hash = await argon2id.hash(password);
  console.log("password hash " + hash);
  return hash;
};

export const verifyPassword = async (hash: string, password: string) => {
  const argon2id = new Argon2id();
  const validPassword = await argon2id.verify(hash, password);
  return validPassword;
};
