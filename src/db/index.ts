import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = (): PostgresJsDatabase => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      select: () => ({
        // @ts-ignore this is for development purposes only
        from: () => [],
        // Would have to fill out skeleton DB functions to make the application work
        // in "non-DATABASE_URL" situations. Probably not worth it and assume DB is set.
      }),
    };
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
