import { NavigationButtons } from "../action_navigate/NavigationButtons";
import NumberFormat from "react-number-format";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Checkbox } from "@rmwc/checkbox";
import axios from "axios";
import { useState, useContext } from "react";
import { FormControl, FormHelperText, LinearProgress } from "@material-ui/core";
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import styles from "./Form.module.css";
import RoxContainer from "../../services/rox/RoxContainer";
import service from "../../services/rox/RoxService";
import Link from "next/link";
import { ReditusEvent, push, pushDonation } from "../../helpers/gtm";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";
import format from "date-fns/format";

import EventIcon from "@material-ui/icons/Event";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { isValidBirthday } from "../../helpers/datehelper";
import {DonationContext} from '../contexts/Donation';
import { DonationMode } from "../hooks/useDonation";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00d4ff",
    },
  },

  overrides: {
    MuiInputBase: {
      input: {
        color: "rgba(255, 255, 255, 0.692)",
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottomColor: "rgba(255, 255, 255, 0.692)",
          marginBottom: "-5px",
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottomColor: "#00d4ff",
        },
        "&:after": {
          marginBottom: "-5px",
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: "rgba(255, 255, 255, 0.692)",
        paddingLeft: ".1rem",
        fontWeight: 300,
        position: "absolute",
      },
      shrink: {
        transform: "translate(0, 20px) scale(0.75)",
      },
    },
    MuiFormLabel: {
      root: {
        marginTop: "-20px",
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
      color: "rgba(255, 255, 255, 0.692)",
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

export const DonationForm = (props: any) => {

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const donation = useContext(DonationContext)


  function successDonation (userExists: boolean, value: number, mode: DonationMode) {
    pushDonation(ReditusEvent.info, "Donation concluded", value, mode);
    push(ReditusEvent.info, "Donation concluded");
    if (userExists) {push(ReditusEvent.info, "Donation done by a recurring user");}
    donation.userExists.set(userExists);
    props.goToStep(3);
  };

  function failedDonation () {
    props.goToStep(4);
  };

  function update (e: any) {
    if (e.target && e.target.type === "radio") {checkedRadio = e.target;}
    push(ReditusEvent.click, `Select ${e.target.value}`);
    donation.value.set(Number(e.target.value));
  };

  const options : number[] = (
    donation.mode.value === 'subscriptions'
      ? RoxContainer.suggestedMonthlyDonationValues
      : RoxContainer.suggestedSingleDonationValues 
  ).getValue().split("|", 3).map((x: string) => Number(x));


  async function onCheckout(e: any) {
    
    e.preventDefault();
    
    const error = donation.validate()
    if (error) return;

    // At this point, we are guaranteed to have a valid date obj.
    const birthday: string = format(donation.birthday.value as Date, "yyyy-MM-dd");

    push(
      ReditusEvent.click,
      `Open modal to donate: ${donation.value.value}`
    );

    const amountInCents = donation.value.value * 100;
    const donationMode = donation.mode.value;

    // Create checkout instance
    const checkout = new PagarMeCheckout.Checkout({
      encryption_key: encryptionKey,
      success: async function (data: any) {
        try {
          donationMode == "subscriptions"
            ? (data["ssr"] = RoxContainer.suggestedMonthlyDonationValues.getValue())
            : (data["ssr"] = RoxContainer.suggestedSingleDonationValues.getValue());

          data["dob"] = donation.birthday.value;
          donation.email.set(data.customer.email);
          setLoading(true);
          const response = await axios.post(`/api/${donationMode}`, data);

          let userExists = false;
          if (response && response.data)
            userExists = !!response.data.userExists;

          setLoading(false);
          return successDonation(userExists, amountInCents, donationMode);
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
        <NavigationButtons step={2} {...props} previousStep={() => {props.previousStep()}} />
        <div className={styles.donationValues}>
          <div className={styles.defaultValues}>

            {options.map((op, idx) => {
              return <>
                <input
                  className={styles.defaultValues__value}
                  type="radio"
                  value={op}
                  name="amountInCents"
                  disabled={loading}
                  onChange={update}
                  id={`option_${idx}`}
                />
                <label
                  className={styles.defaultValues__value}
                  htmlFor="firstDefaultValue"
                >
                  R$ {op}
                </label>
              </>
            })}


          </div>
          <div id={styles.customValue}>
            <FormControl error={donation.value.error} fullWidth={true}>
              <NumberFormat
                label="Quero doar outro valor..."
                prefix={"R$"}
                id={styles.customValue__input}
                name="amountInCents"
                customInput={TextField}
                thousandSeparator={true}
                allowNegative={false}
                onValueChange={(values) => {

                  const value = values.value;
                  if (!value) return;

                  if (checkedRadio) {
                    checkedRadio.checked = false;
                  }

                  push(ReditusEvent.type, `Donate custom value: ${value}`);
                  donation.value.set(Number(value));
                }}
                value={donation.value.value}
                fullwidth
              />
              {donation.value.error && (
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


          <FormControl error={donation.birthday.error} fullWidth={true}>
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
                    value={donation.birthday.value}
                    onChange={(date: Date | null) => {
                      donation.birthday.set(date)
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
              {donation.birthday.error && (
                <FormHelperText
                  id="input-value-birthday-error-text"
                  style={{ margin: 0 }}
                >
                  Por favor, selecione uma data de nascimento válida.
                </FormHelperText>
              )}
            </div>
          </FormControl>


          <div style={{ display: "inline-block", marginTop: "1.5rem" }}>
            <FormControl error={donation.consent.error} fullWidth={true}>
              
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
                  donation.consent.setPrivacyTermsAck(e.target.checked)
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
                  donation.consent.setConsentLicitOrigin(e.target.checked)
                }}
              />

              {donation.consent.error && !donation.consent.privacyTermsAck && (
                <FormHelperText
                  id="terms-privacy-component-error-text"
                  style={{ margin: 0 }}
                >
                  Por favor, leia nossos termos de uso antes de prosseguir.
                </FormHelperText>
              )}

              {donation.consent.error && !donation.consent.consentLicitOrigin && (
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

export default DonationForm;
