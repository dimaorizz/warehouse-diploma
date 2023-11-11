import { Model, ModelOptions, QueryContext } from "objection";
import Provider from "./provider.model";
import { date2mysqlFormat } from "../utils";

class Item extends Model {
  static get tableName() {
    return "item";
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
  description: string;
  count: number;
  min_count: number;
  net_price: number;
  retail_price: number;
  wholesale_price: number;
  provider_id: number;
  created_at: string;
  updated_at: string;

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        description: { type: "string" },
        count: { type: "integer" },
        min_count: { type: "integer" },
        net_price: { type: "number" },
        retail_price: { type: "number" },
        wholesale_price: { type: "number" },
        provider_id: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      provider: {
        relation: Model.BelongsToOneRelation,
        modelClass: Provider,
        join: {
          from: "item.provider_id",
          to: "provider.id",
        },
      },
    };
  }
}

export default Item;
