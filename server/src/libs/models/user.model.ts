import { Model, ModelOptions, QueryContext } from "objection";
import { date2mysqlFormat } from "../utils";

interface IUser {
  id: number;
  role: number;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

class User extends Model implements IUser {
  static get tableName() {
    return "user";
  }

  $beforeInsert(queryContext: QueryContext): Promise<any> | void {
    this.created_at = date2mysqlFormat(new Date());
    this.updated_at = date2mysqlFormat(new Date());
    return super.$beforeInsert(queryContext);
  }

  $beforeUpdate(
    opt: ModelOptions,
    queryContext: QueryContext
  ): Promise<any> | void {
    this.updated_at = date2mysqlFormat(new Date());
    return super.$beforeUpdate(opt, queryContext);
  }

  id: number;
  role: number;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        role: { type: "integer" },
        username: { type: "string" },
        password: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }
}

export default User;
