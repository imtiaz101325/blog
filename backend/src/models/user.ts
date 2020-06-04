import { Model } from "objection";

export default class User extends Model {
  id!: number;
  firstName?: string;
  lastName?: string;
  username!: string;
  about?: string;
  lastLogin?: Date;
  status?: string;
  isAdmin?: boolean;
  isAuthor?: boolean;
  token?: string;
  expiresAt?: Date;
  email!: string;
  salt!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static tableName = "Users";

  static get virtualAttributes() {
    return ["role", "name"];
  }

  get role() {
    if (this.isAdmin) {
      return "admin";
    }

    if (this.isAuthor) {
      return "author";
    }

    return "user";
  }

  get name() {
    const firstName = this.firstName || "";
    const lastName = this.lastName || "";

    return `${firstName} ${lastName}`;
  }
}
