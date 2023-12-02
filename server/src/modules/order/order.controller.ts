import { Request, Response } from "express";
import Order from "../../libs/models/order.model";
import _ from "lodash";
import OrderItem from "../../libs/models/order_item.model";
import Item from "../../libs/models/item.model";

export async function getOrders(req: Request, res: Response) {
  try {
    const data = await Order.query().withGraphFetched("items");
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const data = await Order.query()
      .findById(req.params.id)
      .withGraphFetched("items");
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function postOrder(req: Request, res: Response) {
  try {
    await Order.transaction(async (trx) => {
      const order = req.body;
      const savedOrder = await Order.query(trx).insertAndFetch(
        _.omit(order, ["items"])
      );
      const orderItems = order.items.map((item: any) => ({
        item_id: item.id,
        count: item.count,
        order_id: savedOrder.id,
      }));
      const savedItems = await OrderItem.query(trx).insertGraphAndFetch(
        orderItems
      );
      for (const item of order.items) {
        const currentItem = await Item.query(trx).findById(item.id);
        if (!currentItem) throw new Error("Item not found");
        if ((currentItem?.count as number) - item.count < 0) {
          throw new Error("Trying to set item count < 0");
        } else {
          await Item.query(trx)
            .findById(item.id)
            .patch({
              count: (currentItem?.count as number) - item.count,
            });
        }
      }
      res.json({ data: { ...savedOrder, items: savedItems } });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteOrderById(req: Request, res: Response) {
  try {
    const data = await Order.query().deleteById(req.params.id);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function changeStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await Order.query().findById(id).patch(req.body);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
