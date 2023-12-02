import { Model, ModelOptions, QueryContext } from "objection";
import { date2mysqlFormat } from "../utils";
import knex from "knex";
import Item from "./item.model";

interface IOrder {
  id: number;
  status: number;
  created_at: string;
  updated_at: string;
}

class Order extends Model implements IOrder {
  static get tableName() {
    return "order";
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
  status: number;
  created_at: string;
  updated_at: string;

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        status: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      items: {
        relation: Model.ManyToManyRelation,
        modelClass: Item,
        join: {
          from: "order.id",
          through: {
            from: "order_item.order_id",
            to: "order_item.item_id",
            extra: {
              order_count: "count",
            },
          },
          to: "item.id",
        },
      },
    };
  }
}

export default Order;
