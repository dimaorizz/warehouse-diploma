import { Request, Response } from "express";
import _ from "lodash";
import Item from "../../libs/models/item.model";

export async function getAllItems(req: Request, res: Response) {
  try {
    const data = await Item.query();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getItemById(req: Request, res: Response) {
  try {
    const { itemID } = req.params;
    const data = await Item.query().findById(itemID);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createItem(req: Request, res: Response) {
  try {
    const item = req.body;
    const data = await Item.query().insertAndFetch(item);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateItem(req: Request, res: Response) {
  try {
    const { itemID } = req.params;
    const item = req.body;
    await Item.query().findById(itemID).patch(item);
    const data = await Item.query().findById(itemID);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteItem(req: Request, res: Response) {
  try {
    const { itemID } = req.params;
    const data = await Item.query().findById(itemID);
    await Item.query().deleteById(itemID);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
