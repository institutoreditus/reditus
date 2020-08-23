import { NextApiRequest, NextApiResponse } from "next";
import createDIContainer from "../dependency_injection/createDIContainer";

async function runRequestWithDIContainer(
  req: NextApiRequest,
  res: NextApiResponse,
  func: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  const container = await createDIContainer();
  const scope = container.createScope();
  req.scope = scope;
  try {
    await func(req, res);
  } finally {
    scope.dispose();
  }
}

export default runRequestWithDIContainer;
