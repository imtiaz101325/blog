import * as Knex from "knex";
import faker, { fake } from "faker";

export async function seed(knex: Knex): Promise<any> {
  const authors: { id: number }[] = await knex("Users").where({
    isAuthor: true,
  });

  function createPosts(authors: { id: number }[]) {
    return authors.map(({ id }) => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      author: id,
    }));
  }

  return knex("Posts").insert([
    ...createPosts(authors),
    ...createPosts(authors),
    ...createPosts(authors),
  ]);
}
