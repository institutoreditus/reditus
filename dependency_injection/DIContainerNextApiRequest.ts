import { NextApiRequest } from "next";
import { AwilixContainer } from "awilix";

export interface DIContainerNextApiRequest extends NextApiRequest {
  scope: AwilixContainer<any>;
}
