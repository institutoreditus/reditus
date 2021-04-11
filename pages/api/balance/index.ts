import runRequestWithDIContainer from "../../../middlewares/diContainerMiddleware";
import { DIContainerNextApiRequest } from "../../../dependency_injection/DIContainerNextApiRequest";
import { NextApiRequest, NextApiResponse } from "next";
import convertQueryParamToDate from "../../../helpers/datehelper";
import getBalance, { BalanceGrouping } from "../../../use_cases/getBalance";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    await runRequestWithDIContainer(req, res, runGetBalance);
  } else {
    res.statusCode = 405;
    res.send("");
  }
};

// GET /balance
// Query params:
//      @from: (optional) begin date
//      @to: (optional) end date
//      @groupBy: (optional) week, month, year
async function runGetBalance(
  req: DIContainerNextApiRequest,
  res: NextApiResponse
) {
  let fromDate: Date | undefined = undefined;
  let toDate: Date | undefined = undefined;
  let groupBy: BalanceGrouping | undefined = undefined;

  // validate dates
  const fromDateFromQuery: string | string[] = req.query["from"];
  const toDateFromQuery: string | string[] = req.query["to"];

  try {
    if (fromDateFromQuery) {
      if (Array.isArray(fromDateFromQuery)) {
        res.statusCode = 400;
        res.send('Parametro "from" informado mais de 1 vez');
        return;
      }
      fromDate = convertQueryParamToDate(fromDateFromQuery);
    }
    if (toDateFromQuery) {
      if (Array.isArray(toDateFromQuery)) {
        res.statusCode = 400;
        res.send('Parametro "to" informado mais de 1 vez');
        return;
      }
      toDate = convertQueryParamToDate(toDateFromQuery);
    }
  } catch (err) {
    if (err instanceof Error) {
      res.statusCode = 422;
      res.send(err.message);
    } else {
      res.statusCode = 500;
      console.log(err);
      res.send("");
    }
    return;
  }

  if (fromDate && toDate && fromDate > toDate) {
    res.statusCode = 422;
    res.send("A data inicial deve ser menor que a data final");
    return;
  }

  // validate groupBy
  const groupByFromQuery: string | string[] = req.query["groupBy"];
  if (groupByFromQuery) {
    if (Array.isArray(groupByFromQuery)) {
      res.statusCode = 400;
      res.send('Parametro "groupBy" informado mais de 1 vez');
      return;
    }

    if (groupByFromQuery in BalanceGrouping) {
      groupBy = BalanceGrouping[groupByFromQuery];
    } else {
      res.statusCode = 422;
      res.send("O agrupamento deve ser por: week, month, year");
      return;
    }
  }

  const balance = await getBalance({
    dbClient: req.scope.resolve("dbClient"),
    fromDate: fromDate,
    toDate: toDate,
    groupBy: groupBy,
  });

  (res.statusCode = 200), res.json(balance);
}
