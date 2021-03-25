import { NavigationButtons } from "./action_navigate/NavigationButtons";
import NumberFormat from "react-number-format";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Checkbox } from "@rmwc/checkbox";
import axios from "axios";
import { useState } from "react";
import { FormControl, FormHelperText, LinearProgress } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import styles from "./Form.module.css";
import RoxContainer from "../services/rox/RoxContainer";
import service from "../services/rox/RoxService";
import Link from "next/link";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00d4ff",
    },
  },
});

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
    setUserInputValue("");

    if (e.target && e.target.type === "radio") {
      checkedRadio = e.target;
    }
    props.update(e.target.name, e.target.value);
    setErrorInputValue(false);
  };

  // privacyTermsAck stores whether user has marked the checkbox or not.
  const [privacyTermsAck, setPrivacyTermsAck] = useState(false);
  // errorConsent controls showing the user an error msg in case the user clicks
  // the contribute button without having ack the privacy policy.
  const [errorConsent, setErrorConsent] = useState(false);
  // errorInputValue controls whether no input value was chosen.
  const [errorInputValue, setErrorInputValue] = useState(false);
  // userInputValue controls the NumberFormat input from the user.
  const [userInputValue, setUserInputValue] = useState("");
  // loading controls showing the loading bar.
  const [loading, setLoading] = useState(false);

  const val1 = props.form.donationMode == "subscriptions" ? 30 : 100;
  const val2 = props.form.donationMode == "subscriptions" ? 75 : 200;
  const val3 = props.form.donationMode == "subscriptions" ? 150 : 500;

  async function onCheckout(e: any) {
    e.preventDefault();
    const error =
      !privacyTermsAck ||
      !props.form.amountInCents ||
      props.form.amountInCents < 5;
    if (!privacyTermsAck) {
      setErrorConsent(true);
    }
    if (!props.form.amountInCents || props.form.amountInCents < 5) {
      console.log(props.form.amountInCents);
      setErrorInputValue(true);
    }
    if (error) return;

    const amountInCents = props.form.amountInCents * 100;
    const donationMode = props.form.donationMode;

    // Create checkout instance
    const checkout = new PagarMeCheckout.Checkout({
      encryption_key: encryptionKey,
      success: async function (data: any) {
        try {
          data["ssr"] = `${val1}|${val2}|${val3}`;
          props.update("email", data.customer.email);
          setLoading(true);
          const response = await axios.post(`/api/${donationMode}`, data);

          let userExists = false;
          if (response && response.data)
            userExists = !!response.data.userExists;

          setLoading(false);
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
    <ThemeProvider theme={theme}>
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
            <FormControl error={errorInputValue} fullWidth={true}>
              <NumberFormat
                label="Quero doar outro valor..."
                prefix={"R$"}
                id={styles.customValue__input}
                name="amountInCents"
                customInput={TextField}
                thousandSeparator={true}
                allowNegative={false}
                onValueChange={(values) => {
                  setErrorInputValue(false);
                  const value = values.value;
                  if (!value) return;

                  if (checkedRadio) {
                    checkedRadio.checked = false;
                  }

                  props.update("amountInCents", value);
                  setUserInputValue(value);
                }}
                value={userInputValue}
                fullwidth
              />
              {errorInputValue && (
                <FormHelperText
                  id="input-value-component-error-text"
                  style={{ margin: 0 }}
                >
                  Por favor, selecione ou forneça um valor para doação de, no
                  minimo, 5 reais.
                </FormHelperText>
              )}
            </FormControl>
          </div>

          <p>Vou doar: R$ {props.form.amountInCents}</p>
          <div style={{ display: "inline-block" }}>
            <FormControl error={errorConsent} fullWidth={true}>
              <Checkbox
                className={styles.checkbox}
                disabled={loading}
                label={
                  <div>
                    Li e aceito os{" "}
                    <Link href={"/terms"} passHref>
                      <a target="_blank" style={{ color: "#00d4ff" }}>
                        Termos de Uso
                      </a>
                    </Link>{" "}
                    e{" "}
                    <Link href={"/privacy"}>
                      <a target="_blank" style={{ color: "#00d4ff" }}>
                        Politica de Privacidade
                      </a>
                    </Link>
                  </div>
                }
                type="checkbox"
                name="consentCheckbox"
                onChange={(e: any) => {
                  setPrivacyTermsAck(e.target.checked);
                  setErrorConsent(false);
                }}
              />
              {errorConsent && (
                <FormHelperText
                  id="terms-privacy-component-error-text"
                  style={{ margin: 0 }}
                >
                  Por favor, leia nossos termos de uso antes de prosseguir.
                </FormHelperText>
              )}
            </FormControl>
          </div>
        </div>
        <Button
          label="Doar agora"
          raised
          unelevated
          disabled={loading}
          onClick={onCheckout}
          id={styles.defaultButton}
        />
        {loading && <LinearProgress color="primary" />}
        <br />
        <br />
        Quer nos ajudar doando ainda mais? Envie um email para{" "}
        <a href="mailto:contato@reditus.org.br" style={{ color: "#00d4ff" }}>
          <span color="#00d4ff">contato@reditus.org.br</span>
        </a>{" "}
        e conversamos em mais detalhes!
      </div>
    </ThemeProvider>
  );
};

export default InputDonationValues;
