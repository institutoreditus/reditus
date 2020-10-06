import axios from "axios";

declare let PagarMeCheckout: any;
const encryptionKey = process.env.PAGARME_ENC_KEY;

const onCheckout = async (
  e: any,
  donationFormData: any,
  handleNext: any,
  handleMessage: any
) => {
  e.preventDefault();

  const amountInCents = donationFormData.amountInCents * 100;
  const donationMode = donationFormData.donationMode;

  // Create checkout instance
  const checkout = new PagarMeCheckout.Checkout({
    encryption_key: encryptionKey,
    success: async function (data: any) {
      try {
        await axios.post(`/api/${donationMode}`, data);
        handleMessage(
          "Doação concluída com sucesso! Agora você faz parte dessa corrente do bem."
        );
        handleNext();
      } catch (err) {
        handleMessage(
          "Erro ao realizar doação! Por favor, volte e tente novamente."
        );
        handleNext();
      }
    },
    error: function () {
      handleMessage(
        "Erro ao realizar doação! Por favor, volte e tente novamente."
      );
      handleNext();
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
};

export default onCheckout;
