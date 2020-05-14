import * as Knex from "knex";
import faker from "faker";

import UserTable from "../db/user";
import { generateHash } from "../helpers/auth";

export async function seed(knex: Knex): Promise<any> {
  await UserTable().del();

  const { salt, hash: password } = generateHash("password");
  const generateUsers = () =>
    [
      {
        username: "admin",
        email: "admin@bolg.com",
        isAdmin: true,
        isAuthor: false,
      },
      {
        username: "admin2",
        email: "admin2@bolg.com",
        isAdmin: true,
        isAuthor: false,
      },
      {
        username: "author",
        email: "author@bolg.com",
        isAdmin: false,
        isAuthor: true,
      },
      {
        username: "author2",
        email: "author2@bolg.com",
        isAdmin: false,
        isAuthor: true,
      },
      {
        username: "user",
        email: "user@bolg.com",
        isAdmin: false,
        isAuthor: false,
      },
      {
        username: "user2",
        email: "user2@bolg.com",
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

  return UserTable().insert(generateUsers());
}
