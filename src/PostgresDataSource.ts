import { DataSource } from 'typeorm';  // Adjust the import based on where DataSource comes from

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "db",
  entities: ["./entity/*.ts"],
})

PostgresDataSource
    .initialize()
    .then(() => {
        console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
        console.error(`Data Source initialization error`, err);
    })

export default PostgresDataSource;