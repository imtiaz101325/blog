import knex from "./index";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  about: string;
  lastLogin: Date;
  status: string;
  isAdmin: boolean;
  isAuthor: boolean;
  token: string;
  expiresAt: Date;
  email: string;
  salt: string;
  password: string;
}

export function getRole(isAdmin: boolean, isAuthor: boolean): string {
  if (isAdmin) {
    return "admin";
  }

  if (isAuthor) {
    return "author";
  }

  return "user";
}

export default knex<User>("Users");