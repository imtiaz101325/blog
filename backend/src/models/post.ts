import { Model } from "objection";

import User from "./user";

export default class Post extends Model {
  id!: number;
  title?: string;
  content?: string;
  author!: number;

  static tableName = "Posts";

  static get relationMappings() {
    return {
      authors: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "Posts.id",
          to: "Users.id"
        }
      }
    }
  }
}