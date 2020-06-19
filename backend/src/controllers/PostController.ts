import * as express from "express";

import BaseController from "./BaseController";
import Post from "../models/post";
import User from "../models/user";
import { debug } from "../app";

export default class PostController extends BaseController {
  static async getPosts(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    try {
      const posts = await Post.query().select(
        "id",
        "title",
        "content",
        "author"
      );
      const postsWithAuthor = await Promise.all(
        posts.map(async (post) => {
          const { id, title, content, author } = post;

          try {
            const { name } = await User.query()
              .select("firstName", "lastName", "isAuthor", "isAdmin")
              .where({ id: author })
              .first();

            return {
              id,
              title,
              content,
              author: {
                id: author,
                name,
              },
            };
          } catch (err) {
            debug(`Error fetching user with id: ${author}: `, err);

            return res.status(500).send({
              error: "Could not query database.",
            });
          }
        })
      );

      return res.send(postsWithAuthor);
    } catch (err) {
      debug("Error fetching posts: ", err);

      return res.status(500).send({
        error: "Could not query database.",
      });
    }
  }
}
