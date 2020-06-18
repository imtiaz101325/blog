import * as Knex from "knex";
import faker from "faker";

import { generateHash } from "../helpers/auth";

export async function seed(knex: Knex): Promise<any> {
  await knex("Posts").del();
  await knex("Users").del();

  const { salt, hash: password } = generateHash("password");
  const generateUsers = () =>
    [
      {
        username: "admin",
        email: "admin@blog.com",
        isAdmin: true,
        isAuthor: false,
      },
      {
        username: "admin2",
        email: "admin2@blog.com",
        isAdmin: true,
        isAuthor: false,
      },
      {
        username: "author",
        email: "author@blog.com",
        isAdmin: false,
        isAuthor: true,
      },
      {
        username: "author2",
        email: "author2@blog.com",
        isAdmin: false,
        isAuthor: true,
      },
      {
        username: "author3",
        email: "author3@blog.com",
        isAdmin: false,
        isAuthor: true,
      },
      {
        username: "author4",
        email: "author4@blog.com",
        isAdmin: false,
        isAuthor: true,
      },
      {
        username: "user",
        email: "user@blog.com",
        isAdmin: false,
        isAuthor: false,
      },
      {
        username: "user2",
        email: "user2@blog.com",
        isAdmin: false,
        isAuthor: false,
      },
    ].map(({ username, email, isAdmin, isAuthor }) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username,
      about: faker.lorem.sentences(4),
      isAdmin,
      isAuthor,
      email,
      salt,
      password,
    }));

  return knex("Users").insert(generateUsers());
}
