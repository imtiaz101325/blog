import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("Users", function createUsersTable(table) {
    table.increments("id");
    table.string("firstName");
    table.string("lastName");
    table.string("username").notNullable().unique();
    table.text("about");
    table.date("lastLogin");
    table.enum("status", ["active", "inactive"]).defaultTo("active");
    table.boolean("isAdmin").defaultTo(false);
    table.boolean("isAuthor").defaultTo(false);
    table.string("token", 1024);
    table.date("expiresAt");
    table.string("email").notNullable().unique();
    table.string("salt").notNullable();
    table.string("password").notNullable();
    table.date("createdAt").notNullable().defaultTo(knex.fn.now());
    table.date("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("Users");
}
