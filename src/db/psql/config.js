import pg from "pg";
import setupEnv from "../../lib/setupEnv.js";

// Set up dotenv environment from .env file.
setupEnv("../.env");

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  max: 20,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, // Heroku addons
  ssl: {
    rejectUnauthorized: false,
  },
};

export default new pg.Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);
