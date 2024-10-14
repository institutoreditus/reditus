import { NextApiRequest, NextApiResponse } from "next";
import runRequestWithDIContainer from "../../../middlewares/diContainerMiddleware";
import { PrismaClient } from "@prisma/client";
import { DIContainerNextApiRequest } from "../../../dependency_injection/DIContainerNextApiRequest";
import { RANKING_INITIAL_DATA } from "./contants";
import { getRankingList } from "../../../use_cases/getRankingList";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await runRequestWithDIContainer(req, res, run);
  } else {
    res.statusCode = 405;
    res.send("");
  }
};

async function run(req: DIContainerNextApiRequest, res: NextApiResponse) {
  const prismaClient: PrismaClient = req.scope.resolve("dbClient");
  try {
    const rankingData = await getRankingList({
      dbClient: prismaClient,
      initialDate: RANKING_INITIAL_DATA
    });
    res.statusCode = 200;
    res.json(rankingData);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    return;
  }
}