import bcrypt from "bcrypt";
import { User, modelUser } from "../models/ModelUser";

export const passwordGenerator = async (password: string) => {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Hashing error:", error);
    throw error;
  }
};

export const comparePassword = async (
  candidatePassword: string,
  userPasswordHash: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(candidatePassword, userPasswordHash);
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
};
