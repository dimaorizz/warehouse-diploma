import { Model, ModelOptions, QueryContext } from "objection";
import { date2mysqlFormat } from "../utils";
import knex from "knex";
import Order from "./order.model";
import Item from "./item.model";

interface IOrderItem {
  id: number;
  count: number;
  order_id: number;
  item_id: number;

  created_at: string;
  updated_at: string;
}

class OrderItem extends Model implements IOrderItem {
  static get tableName() {
    return "order_item";
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
  order_id: number;
  item_id: number;
  created_at: string;
  updated_at: string;

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        count: { type: "integer" },
        order_id: { type: "integer" },
        item_id: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: "order_item.order_id",
          to: "order.id",
        },
      },
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: "order_item.item_id",
          to: "item.id",
        },
      },
    };
  }
}

export default OrderItem;
