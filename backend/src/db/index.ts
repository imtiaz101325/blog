import kenx from "knex";

const config = require('../knexfile.ts');
const currentEnv: string | undefined = process.env.NODE_ENV;
const currentConfig = currentEnv && config[currentEnv];

export default kenx(currentConfig);