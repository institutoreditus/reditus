import { Button } from "@rmwc/button";
import axios from "axios";
import { useState, useContext } from "react";
import { LinearProgress } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import styles from "../Form.module.css";
import RoxContainer from "../../services/rox/RoxContainer";
import service from "../../services/rox/RoxService";
import { ReditusEvent, push, pushDonation } from "../../helpers/gtm";

import format from "date-fns/format";

import { DonationContext } from "../contexts/DonationContext";
import ValueDefaultOptions from "./ValueDefaultOptions";
import SelectBirthday from "./SelectBirthday";
import DonationModeSwitch from "./DonationMode";
import { DonationMode } from "../hooks/useDonationMode";
import ConsentCheckboxes from "./ConsentCheckboxes";

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

service(RoxContainer);

declare let PagarMeCheckout: any;
const encryptionKey = process.env.PAGARME_ENC_KEY;

export const DonationForm = (props: any) => {
  const [loading, setLoading] = useState(false);
  const donation = useContext(DonationContext);

  function successDonation(
    userExists: boolean,
    value: number,
    mode: DonationMode
  ) {
    pushDonation(ReditusEvent.info, "Donation concluded", value, mode);
    push(ReditusEvent.info, "Donation concluded");
    if (userExists) {
      push(ReditusEvent.info, "Donation done by a recurring user");
    }
    donation.userExists.set(userExists);
    props.goToStep(2);
  }

  function failedDonation() {
    props.goToStep(3);
  }

  async function onCheckout(e: any) {
    e.preventDefault();

    const error = donation.validate();
    if (error) return;

    // At this point, we are guaranteed to have a valid date obj.
    const birthday: string = format(
      donation.birthday.value as Date,
      "yyyy-MM-dd"
    );

    push(ReditusEvent.click, `Open modal to donate: ${donation.value.value}`);

    const amountInCents = donation.value.value * 100;
    const donationMode = donation.mode.value;

    // Create checkout instance
    const checkout = new PagarMeCheckout.Checkout({
      encryption_key: encryptionKey,
      success: async function (data: any) {
        try {
          donationMode == "subscriptions"
            ? (data[
                "ssr"
              ] = RoxContainer.suggestedMonthlyDonationValues.getValue())
            : (data[
                "ssr"
              ] = RoxContainer.suggestedSingleDonationValues.getValue());

          data["dob"] = birthday;
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
      <div className={styles.donationForm}>
        <div className={styles.donationInputs}>
          <DonationModeSwitch />
          <ValueDefaultOptions />
          <SelectBirthday />
          <ConsentCheckboxes />
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

        <FooterMessage />
      </div>
    </ThemeProvider>
  );
};

function FooterMessage() {
  return (
    <a
      href="mailto:contato@reditus.org.br"
      className={styles.footerMessageLink}
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.footerMessage}>
        Quer doar ainda mais? Envie um email para{" "}
        <span color="#00d4ff">contato@reditus.org.br</span> e conversamos em
        mais detalhes!
      </div>
    </a>
  );
}

export default DonationForm;
