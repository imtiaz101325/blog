import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("Users", function (table) {
    table.increments("id");
    table.string("firstName");
    table.string("lastName");
    table.string("username").notNullable().unique();
    table.text("about");
    table.date("lastLogin");
    table.enum("status", ["active", "inactive"]).defaultTo("inactive");
    table.boolean("isAdmin").defaultTo(false);
    table.boolean("isAuthor").defaultTo(false);
    table.string("token", 1024);
    table.date("expiresAt");
    table.string("email").notNullable().unique();
    table.string("salt");
    table.string("password");
    table.date("createdAt").notNullable();
    table.date("updatedAt").notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("Users");
}