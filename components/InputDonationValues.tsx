import { NavigationButtons } from "./action_navigate/NavigationButtons";
import NumberFormat from "react-number-format";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Checkbox } from "@rmwc/checkbox";
import axios from "axios";
import { useState } from "react";
import { FormControl, FormHelperText, LinearProgress } from "@material-ui/core";
import {
  createTheme,
  createStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import styles from "./Form.module.css";
import RoxContainer from "../services/rox/RoxContainer";
import service from "../services/rox/RoxService";
import Link from "next/link";
import { ReditusEvent, push } from "../helpers/gtm";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";
import format from "date-fns/format";

import EventIcon from "@material-ui/icons/Event";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { isValidBirthday } from "../helpers/datehelper";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00d4ff",
    },
  },

  overrides: {
    MuiInputBase: {
      input: {
        color: "white",
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottomColor: "white",
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottomColor: "#00d4ff",
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: "white",
        marginBottom: "-25px !important",
        paddingBottom: "20px",
        position: "absolute",
      },
    },
    MuiFormLabel: {
      root: {
        marginTop: "-10px",
      },
    },
    MuiButtonBase: {
      root: {
        marginBottom: "20px",
      },
    },
  },
});

const useStyles = makeStyles(() =>
  createStyles({
    picker: {
      width: "100%",
      marginTop: 5,
      paddingTop: 0,
    },
    datePickerIcon: {
      color: "white",
      "&:hover": {
        color: "#00d4ff",
      },
    },
    "&.MuiPickersToolbarButton-toolbarBtn": {
      fontSize: "40px !important",
    },
  })
);

service(RoxContainer);

declare let PagarMeCheckout: any;
const encryptionKey = process.env.PAGARME_ENC_KEY;
let checkedRadio: any;

export const InputDonationValues = (props: any) => {
  const classes = useStyles();

  const validate = () => {
    props.previousStep();
  };

  const successDonation = (userExists: boolean) => {
    push(ReditusEvent.info, "Donation concluded");
    if (userExists) {
      push(ReditusEvent.info, "Donation done by a recurring user");
    }
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
    push(ReditusEvent.click, `Select ${e.target.value}`);
    props.update(e.target.name, e.target.value);
    setErrorInputValue(false);
  };

  // privacyTermsAck stores whether user has marked the checkbox or not.
  const [privacyTermsAck, setPrivacyTermsAck] = useState(false);
  // licitConsent stores whether user has marked the checkbox or not.
  const [consentLicitOrigin, setConsentLicitOrigin] = useState(false);
  // errorConsent controls showing the user an error msg in case the user clicks
  // the contribute button without having ack the privacy policy.
  const [errorConsent, setErrorConsent] = useState(false);
  // errorInputValue controls whether no input value was chosen.
  const [errorInputValue, setErrorInputValue] = useState(false);
  // userInputValue controls the NumberFormat input from the user.
  const [userInputValue, setUserInputValue] = useState("");
  // errorBirthday controls whether in invalid birthday was selected.
  const [errorBirthday, setErrorBirthday] = useState(false);
  // loading controls showing the loading bar.
  const [loading, setLoading] = useState(false);

  const [
    mValue1,
    mValue2,
    mValue3,
  ] = RoxContainer.suggestedMonthlyDonationValues
    .getValue()
    .split("|", 3)
    .map((x: string) => +x);

  const [sValue1, sValue2, sValue3] = RoxContainer.suggestedSingleDonationValues
    .getValue()
    .split("|", 3)
    .map((x: string) => +x);

  const val1 = props.form.donationMode == "subscriptions" ? mValue1 : sValue1;
  const val2 = props.form.donationMode == "subscriptions" ? mValue2 : sValue2;
  const val3 = props.form.donationMode == "subscriptions" ? mValue3 : sValue3;

  async function onCheckout(e: any) {
    e.preventDefault();
    const error =
      !privacyTermsAck ||
      !consentLicitOrigin ||
      !props.form.amountInCents ||
      props.form.amountInCents < 5 ||
      !isValidBirthday(selectedBirthday);
    if (!privacyTermsAck || !consentLicitOrigin) {
      setErrorConsent(true);
    }
    if (!props.form.amountInCents || props.form.amountInCents < 5) {
      console.log(props.form.amountInCents);
      setErrorInputValue(true);
    }
    if (!isValidBirthday(selectedBirthday)) {
      setErrorBirthday(true);
    }
    if (error) return;

    // At this point, we are guaranteed to have a valid date obj.
    const birthday: string = format(selectedBirthday as Date, "yyyy-MM-dd");

    push(
      ReditusEvent.click,
      `Open modal to donate: ${props.form.amountInCents}`
    );

    const amountInCents = props.form.amountInCents * 100;
    const donationMode = props.form.donationMode;

    // Create checkout instance
    const checkout = new PagarMeCheckout.Checkout({
      encryption_key: encryptionKey,
      success: async function (data: any) {
        try {
          props.form.donationMode == "subscriptions"
            ? (data[
                "ssr"
              ] = RoxContainer.suggestedMonthlyDonationValues.getValue())
            : (data[
                "ssr"
              ] = RoxContainer.suggestedSingleDonationValues.getValue());

          data["dob"] = birthday;
          props.update("email", data.customer.email);
          props.update("birthday", birthday);
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

  // Picker to birthday's field
  const [selectedBirthday, setSelectedBirthday] = useState<Date | null>(null);

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

                  push(ReditusEvent.type, `Donate custom value: ${value}`);
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
          <FormControl error={errorBirthday} fullWidth={true}>
            <div className="label-class">
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                <Grid container>
                  <KeyboardDatePicker
                    name="birthday"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Data de nascimento"
                    format="dd/MM/yyyy"
                    color="primary"
                    className={classes.picker}
                    value={selectedBirthday}
                    onChange={(date: Date | null) => {
                      setSelectedBirthday(date);
                      setErrorBirthday(false);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    keyboardIcon={
                      <EventIcon className={classes.datePickerIcon} />
                    }
                    invalidDateMessage={null}
                    maxDateMessage={null}
                    minDateMessage={null}
                    autoOk
                    disableFuture
                    views={["year", "month", "date"]}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              {errorBirthday && (
                <FormHelperText
                  id="input-value-birthday-error-text"
                  style={{ margin: 0 }}
                >
                  Por favor, selecione uma data de nascimento válida.
                </FormHelperText>
              )}
            </div>
          </FormControl>
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
                  push(
                    ReditusEvent.click,
                    `Mark T&C checkbox: ${e.target.checked}`
                  );
                  setPrivacyTermsAck(e.target.checked);
                  setErrorConsent(false);
                }}
              />

              <Checkbox
                className={styles.checkbox}
                disabled={loading}
                label={
                  <div style={{ fontSize: 13 }}>
                    Declaro que as quantias doadas não são produto de crime ou
                    oriundas de quaisquer atividades ilícitas.
                  </div>
                }
                type="checkbox"
                name="consentLicitOriginCheckbox"
                onChange={(e: any) => {
                  push(
                    ReditusEvent.click,
                    `Mark T&C checkbox: ${e.target.checked}`
                  );
                  setConsentLicitOrigin(e.target.checked);
                  setErrorConsent(false);
                }}
              />

              {errorConsent && !privacyTermsAck && (
                <FormHelperText
                  id="terms-privacy-component-error-text"
                  style={{ margin: 0 }}
                >
                  Por favor, leia nossos termos de uso antes de prosseguir.
                </FormHelperText>
              )}

              {errorConsent && !consentLicitOrigin && (
                <FormHelperText
                  id="consent-licit-prigin-component-error-text"
                  style={{ margin: 0 }}
                >
                  Para prosseguir também precisamos que você confirme que a
                  origem da doação é lícita.
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
