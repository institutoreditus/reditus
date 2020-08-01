import validatePagarmePostback from "./validatePagarmePostback";
import pagarme from "pagarme";

// Set any random key for testing
const oldKey = process.env.PAGARME_API_KEY;
beforeEach(() => (process.env.PAGARME_API_KEY = "mykey"));
afterEach(() => (process.env.PAGARME_API_KEY = oldKey));

const rawBody = "any body";
const expectedSignature = pagarme.postback.calculateSignature("mykey", rawBody);

test("returns true with valid signature", async () => {
  const validPostback = await validatePagarmePostback({
    requestBodyText: rawBody,
    requestSignatureHeader: expectedSignature,
  });
  expect(validPostback).toBe(true);
});

test("returns true with invalid signature", async () => {
  const validPostback = await validatePagarmePostback({
    // Even a small change should make the validation fail.
    requestBodyText: rawBody + " ",
    requestSignatureHeader: expectedSignature,
  });
  expect(validPostback).toBe(false);
});

export {};
