import { Request, Response } from "express";
import Provider from "../../libs/models/provider.model";
import _ from "lodash";

export async function getAllProviders(req: Request, res: Response) {
  try {
    const data = await Provider.query();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getProviderById(req: Request, res: Response) {
  try {
    const { providerID } = req.params;
    const data = await Provider.query().findById(providerID);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createProvider(req: Request, res: Response) {
  try {
    const provider = req.body;
    const data = await Provider.query().insertAndFetch(provider);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateProvider(req: Request, res: Response) {
  try {
    const { providerID } = req.params;
    const provider = req.body;
    await Provider.query().findById(providerID).patch(provider);
    const data = await Provider.query().findById(providerID);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteProvider(req: Request, res: Response) {
  try {
    const { providerID } = req.params;
    const data = await Provider.query().findById(providerID);
    await Provider.query().deleteById(providerID);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
