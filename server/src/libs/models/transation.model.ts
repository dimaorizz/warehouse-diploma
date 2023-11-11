import { Model, ModelOptions, QueryContext } from "objection";
import Item from "./item.model";
import { date2mysqlFormat } from "../utils";

class Transaction extends Model {
  static get tableName() {
    return "transaction";
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
  count: number;
  discount: number;
  item_id: number;
  created_at: string;
  updated_at: string;

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        count: { type: "integer" },
        discount: { type: "number" },
        item_id: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: "transaction.item_id",
          to: "item.id",
        },
      },
    };
  }
}

export default Transaction;
