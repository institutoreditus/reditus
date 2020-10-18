import { createContainer, asFunction } from "awilix";
import { PrismaClient } from "@prisma/client";
import pagarme from "pagarme";

async function createDIContainer() {
  const container = createContainer();

  container.register({
    dbClient: asFunction(createPrismaClient)
      .scoped()
      .disposer((client) => {
        client.disconnect();
      }),
    pagarmeClient: asFunction(createPagarmeClient).singleton(),
  });

  return container;
}

function createPrismaClient(): PrismaClient {
  return new PrismaClient();
}

async function createPagarmeClient() {
  const pagarmeClient = await pagarme.client.connect({
    api_key: process.env.PAGARME_API_KEY,
  });
  return pagarmeClient;
}

export default createDIContainer;
