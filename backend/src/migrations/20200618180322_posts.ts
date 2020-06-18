import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("Posts", function createPostsTable(table) {
    table.increments("id");
    table.string("title", 100);
    table.text("content");
    table.integer("author").unsigned().notNullable();

    table.foreign("author").references("id").inTable("Users");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("Posts");
}
