// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { newDb } from "../../lib/db";

type Data = {
  network: string;
  db: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { network, db } = req.body;
    if (
      req.method === "POST" &&
      network &&
      db &&
      typeof network === "string" &&
      typeof db === "string"
    ) {
      const newLedger = await newDb(network, db);
      res.status(201).json(newLedger);
    } else res.status(200).json({ network: "boo", db: "hoo" });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}
