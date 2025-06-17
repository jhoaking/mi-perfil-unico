import { connect } from "../db.js";

export class UserClass {
  static guardarUser = async (github_id, username, avatar_url,project) => {
    const query = `INSERT INTO "Users"(github_id,username,avatar_url,createdAt,project)VALUES($1,$2,$3,NOW(),$4)RETURNING * ;`;
    const values = [github_id, username, avatar_url,project];
    const result = await connect.query(query, values);
    return result.rows[0];
  };

  static buscarPorId = async (github_id) => {
    const query = `SELECT * FROM "Users" WHERE github_id = $1 LIMIT 1 `;
    const result = await connect.query(query, [github_id]);
    return result.rows[0];
  };

  static controlUser = async (github_id) => {
    const query = `SELECT * FROM "USERS" WHERE github_id = $1`;
    const result = await connect.query(query, [github_id]);
    if (result.rowCount === 0) return null;

    return result.rows[0];
  };
}
