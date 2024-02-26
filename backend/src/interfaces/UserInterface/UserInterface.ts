export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  wallet: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserCreationAttributes {
  id?:string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  wallet: number;
}
