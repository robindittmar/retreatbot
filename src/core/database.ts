import { DataSource } from "typeorm";
import { CategoryModel } from "../models/category-model.ts";

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: Deno.env.get("DENO_ENV") === "development" ? "localhost" : "mysql",
  port: 3306,
  maxQueryExecutionTime: 5000,
  poolSize: 10,
  username: "reatreatbot_user",
  password: "6sBfdAq$HkgNA$MwkmwaXQ6FH&c3rpd2",
  database: "retreatbot",
  logging: Deno.env.get("DENO_ENV") === "development",
  entities: [
    CategoryModel,
  ],
  migrations: [],
  subscribers: [],
});
