import NumberFormat from "react-number-format";
import { TextField } from "@rmwc/textfield";
import { Checkbox } from "@rmwc/checkbox";
import { useState, useContext } from "react";
import { FormControl, FormHelperText } from "@material-ui/core";
import {
  createMuiTheme,
  createStyles,
  makeStyles,
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
import {DonationContext} from '../contexts/Donation';
import { DonationMode } from "../hooks/useDonation";


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


let checkedRadio: any;

export const DonationForm = (props: any) => {

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const donation = useContext(DonationContext)


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


  return (
    <div className={styles.donationValues}>
          <div className={styles.defaultValues}>

            {options.map((op, idx) => {
              return <>
                <input
                  className={styles.defaultValues__value}
                  type="radio"
                  value={op}
                  name="amountInCents"
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
  );
};

export default DonationForm;
