import knex from "knex";

const config = require("../knexfile");
const currentEnv: string | undefined = process.env.NODE_ENV;
const currentConfig = currentEnv && config[currentEnv];

export default knex(currentConfig);
