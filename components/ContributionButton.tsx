import { Button } from "@rmwc/button";

declare let PagarMeCheckout: any;

function onCheckout(e: any) {
  e.preventDefault();

  // inicia a instância do checkout
  const checkout = new PagarMeCheckout.Checkout({
    encryption_key: "SUA ENCRYPTION KEY",
    success: function (data: any) {
      console.log(data);
    },
    error: function (err: any) {
      console.log(err);
    },
    close: function () {
      console.log("The modal has been closed.");
    },
  });

  // Obs.: é necessário passar os valores boolean como string
  checkout.open({
    amount: 50000,
    buttonText: "Contribuir",
    buttonClass: "botao-pagamento",
    customerData: "true",
    createToken: "true",
    paymentMethods: "credit_card",
    uiColor: "#00d4ff",
    headerText: "Vou contribuir com {price_info}",
  });
}

export function ContributionButton() {
  return (
    <>
      <Button
        onClick={onCheckout}
        label="Contribua você também"
        raised
        unelevated
      />
    </>
  );
}
