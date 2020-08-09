import { NavigationButtons } from "./action_navigate/NavigationButtons";
import NumberFormat from "react-number-format";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import axios from "axios";

import styles from "./Form.module.css";

declare let PagarMeCheckout: any;
const encryptionKey = process.env.PAGARME_ENC_KEY;
let checkedRadio: any;

export const InputDonationValues = (props: any) => {
  const validate = () => {
    props.previousStep();
  };

  const successDonation = () => {
    props.goToStep(3);
  };

  const failedDonation = () => {
    props.goToStep(4);
  };

  const update = (e: any) => {
    if (e.target && e.target.type === "radio") {
      checkedRadio = e.target;
    }
    props.update(e.target.name, e.target.value);
  };

  async function onCheckout(e: any) {
    e.preventDefault();

    const amountInCents = props.form.amountInCents * 100;
    const donationMode = props.form.donationMode;

    // Create checkout instance
    const checkout = new PagarMeCheckout.Checkout({
      encryption_key: encryptionKey,
      success: async function (data: any) {
        try {
          await axios.post(`/api/${donationMode}`, data);
          return successDonation();
        } catch (err) {
          // alert("Erro ao doar");
          return failedDonation();
        }
      },
      error: function () {
        // alert("Erro ao doar");
        return failedDonation();
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

  return (
    <div>
      {props.form.firstname && <h3>Hey {props.form.teste}!</h3>}
      <NavigationButtons step={2} {...props} previousStep={validate} />

      <div className={styles.donationValues}>
        <div className={styles.defaultValues}>
          <input
            className={styles.defaultValues__value}
            type="radio"
            value={25}
            name="amountInCents"
            onChange={update}
            id="firstDefaultValue"
          />
          <label
            className={styles.defaultValues__value}
            htmlFor="firstDefaultValue"
          >
            R$ 25
          </label>

          <input
            className={styles.defaultValues__value}
            type="radio"
            value={50}
            name="amountInCents"
            onChange={update}
            id="secondDefaultValue"
          />
          <label
            className={styles.defaultValues__value}
            htmlFor="secondDefaultValue"
          >
            R$ 50
          </label>

          <input
            className={styles.defaultValues__value}
            type="radio"
            value={75}
            name="amountInCents"
            onChange={update}
            id="thirdDefaultValue"
          />
          <label
            className={styles.defaultValues__value}
            htmlFor="thirdDefaultValue"
          >
            R$ 75
          </label>
        </div>
        <p>Vou doar: R$ {props.form.amountInCents}</p>
        <div id={styles.customValue}>
          <NumberFormat
            label="Quero doar outro valor..."
            prefix={"R$"}
            id={styles.customValue__input}
            name="amountInCents"
            customInput={TextField}
            thousandSeparator={true}
            allowNegative={false}
            onValueChange={(values) => {
              if (checkedRadio) {
                checkedRadio.checked = false;
              }

              const value = values.value;

              props.update("amountInCents", value);
            }}
            fullwidth
          />
        </div>
      </div>
      <Button
        label="Doar agora"
        raised
        unelevated
        onClick={onCheckout}
        id={styles.defaultButton}
      />
    </div>
  );
};

export default InputDonationValues;
