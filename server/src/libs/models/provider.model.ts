import { Model, ModelOptions, QueryContext } from "objection";
import { date2mysqlFormat } from "../utils";
import knex from "knex";

interface IProvider {
  id: number;
  name: string;
  country: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

class Provider extends Model implements IProvider {
  static get tableName() {
    return "provider";
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
  name: string;
  country: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        country: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }
}

export default Provider;
