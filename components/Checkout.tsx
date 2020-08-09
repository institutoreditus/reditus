import axios from "axios";

declare let PagarMeCheckout: any;
const encryptionKey = process.env.PAGARME_ENC_KEY;

async function onCheckout(e: any) {
  e.preventDefault();

  // TODO: Ask that somewhere in the frontend
  const amountInCents = 1111;

  // Create checkout instance
  const checkout = new PagarMeCheckout.Checkout({
    encryption_key: encryptionKey,
    success: async function (data: any) {
      try {
        await axios.post("/api/contributions", data);
      } catch (err) {
        alert("Erro ao doar");
      }
    },
    error: function () {
      alert("Erro ao doar");
    },
    close: function () {
      console.log("The modal has been closed.");
    },
  });

  // Checkout API require booleans to be passed as strings
  checkout.open({
    amount: amountInCents,
    buttonText: "Contribuir",
    buttonClass: "botao-pagamento",
    customerData: "true",
    createToken: "false",
    paymentMethods: "credit_card",
    uiColor: "#00d4ff",
    headerText: "Vou contribuir com {price_info}",
  });
}

export default onCheckout;
