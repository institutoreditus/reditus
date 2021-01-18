import { NavigationButtons } from "./action_navigate/NavigationButtons";
import NumberFormat from "react-number-format";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import axios from "axios";

import styles from "./Form.module.css";
import RoxContainer from "../services/rox/RoxContainer";
import service from "../services/rox/RoxService";
service(RoxContainer);

declare let PagarMeCheckout: any;
const encryptionKey = process.env.PAGARME_ENC_KEY;
let checkedRadio: any;

export const InputDonationValues = (props: any) => {
  const validate = () => {
    props.previousStep();
  };

  const successDonation = (userExists: boolean) => {
    props.update("userExists", userExists);
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

  // val1, val2 and val3 are the three suggested donation values we show the users.
  // These values come from our flags container, and are mutable. They can be remotely
  // changed using rollout.io's dashboard. This is used for A/B testing.
  const [val1, val2, val3] = RoxContainer.suggestedDonationValues
    .getValue()
    .split("|", 3)
    .map((x: string) => +x);

  async function onCheckout(e: any) {
    e.preventDefault();

    const amountInCents = props.form.amountInCents * 100;
    const donationMode = props.form.donationMode;

    // Create checkout instance
    const checkout = new PagarMeCheckout.Checkout({
      encryption_key: encryptionKey,
      success: async function (data: any) {
        try {
          data["ssr"] = RoxContainer.suggestedDonationValues.getValue();
          props.update("email", data.customer.email);
          const response = await axios.post(`/api/${donationMode}`, data);

          let userExists = false;
          if (response && response.data)
            userExists = !!response.data.userExists;

          return successDonation(userExists);
        } catch (err) {
          return failedDonation();
        }
      },
      error: function () {
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
            value={val1}
            name="amountInCents"
            onChange={update}
            id="firstDefaultValue"
          />
          <label
            className={styles.defaultValues__value}
            htmlFor="firstDefaultValue"
          >
            R$ {val1}
          </label>

          <input
            className={styles.defaultValues__value}
            type="radio"
            value={val2}
            name="amountInCents"
            onChange={update}
            id="secondDefaultValue"
          />
          <label
            className={styles.defaultValues__value}
            htmlFor="secondDefaultValue"
          >
            R$ {val2}
          </label>

          <input
            className={styles.defaultValues__value}
            type="radio"
            value={val3}
            name="amountInCents"
            onChange={update}
            id="thirdDefaultValue"
          />
          <label
            className={styles.defaultValues__value}
            htmlFor="thirdDefaultValue"
          >
            R$ {val3}
          </label>
        </div>

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

        <p>Vou doar: R$ {props.form.amountInCents}</p>
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
