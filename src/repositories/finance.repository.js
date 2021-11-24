import connection from "../database.js";

async function create({ id, value, type }) {
  await connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [id, value, type]
  );
}

async function getAllFinancesForUser({ user }) {
  const events = await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [user]
  );
  return events.rows;
}

export { create, getAllFinancesForUser };
