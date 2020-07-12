import pagarme from "pagarme";

const validatePagarmePostback = async (
  args: ValidatePagarmePostbackArgs
): Promise<Boolean> => {
  const apiKey = process.env.PAGARME_API_KEY;
  const verifyBody = args.requestBodyText;
  const header = args.requestSignatureHeader;
  const signature = header.replace("sha1=", "");
  return pagarme.postback.verifySignature(apiKey, verifyBody, signature);
};

export default validatePagarmePostback;

interface ValidatePagarmePostbackArgs {
  requestBodyText: string;
  requestSignatureHeader: string;
}
