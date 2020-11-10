import * as hubspot from "@hubspot/api-client";

export default async function sendHubspotContact(name: string, email: string) {
  const hubspotApiKey = process.env.HUBSPOT_API_KEY;

  if (hubspotApiKey === undefined) {
    console.log("API Key nao cadastrada");
    return;
  }
  const hubspotClient = new hubspot.Client({
    apiKey: hubspotApiKey,
  });

  const contactObj = {
    properties: {
      firstname: name,
      email: email,
    },
  };

  try {
    const hubspotContact = await hubspotClient.crm.contacts.basicApi.create(
      contactObj
    );
    console.log(
      `Contato criado com sucesso: ${JSON.stringify(hubspotContact)}`
    );
  } catch (e) {
    console.log(e);
  }
}
