import { User } from "../../models/ModelUser";

export interface UserIRepository {
  register(name: string, email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<User | null>;
  getUsers(id:number): Promise<User[]>;
}
