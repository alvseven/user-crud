export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  contact: string;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  contact: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  contact?: string;
}
