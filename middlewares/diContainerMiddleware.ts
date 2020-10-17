import { NextApiRequest, NextApiResponse } from "next";
import { DIContainerNextApiRequest } from "../dependency_injection/DIContainerNextApiRequest";
import createDIContainer from "../dependency_injection/createDIContainer";

async function runRequestWithDIContainer(
  req: NextApiRequest,
  res: NextApiResponse,
  func: (req: DIContainerNextApiRequest, res: NextApiResponse) => Promise<void>
) {
  const container = await createDIContainer();
  const scope = container.createScope();
  const diReq = req as DIContainerNextApiRequest;
  diReq.scope = scope;
  try {
    await func(diReq, res);
  } finally {
    scope.dispose();
  }
}

export default runRequestWithDIContainer;
