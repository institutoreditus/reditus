import { Checkbox } from "@rmwc/checkbox";

import { useContext, useState } from "react";
import { FormControl, FormHelperText, FormGroup, FormLabel, FormControlLabel, Typography } from "@material-ui/core";
import styles from "../Form.module.css";
import Link from "next/link";
import { ReditusEvent, push } from "../../helpers/gtm";

import { DonationContext } from "../contexts/DonationContext";


export default function ConsentCheckboxes () {

  const donation = useContext(DonationContext);

  const labelPrivacyTermsAck = <>
    Li e aceito os <>
      <a href="/terms" target="_blank" style={{ color: "#00d4ff", textDecoration: 'none' }}>Termos de Uso</a>
      </> e a <><a href='/privacy' target="_blank" style={{ color: "#00d4ff", textDecoration: 'none' }}>Politica de Privacidade</a></>.
  </>

  const labelLicitOrigin = "Declaro que as quantias doadas não são produto de crime ou oriundas de quaisquer atividades ilícitas."

  const errorBoth = "Por favor, leia nossos termos de uso e confirme que a origem da doação é lícita."
  const errorPrivacyTermsAck = "Por favor, leia nossos termos de uso."
  const errorLicitOrigin = "Por favor, confirme que a origem da doação é lícita."

  return <div 
      className={styles.donationInputsSection_wrapped}>
      <FormControl
        required
        error={donation.consent.error}
        component="fieldset"
        variant="standard"
        fullWidth={true}
      >
        <FormGroup className={styles.checkboxGroup}>

          <FormControlLabel
            control={
              <Checkbox 
                name="privacyTermsAck"
                checked={donation.consent.privacyTermsAck} 
                onChange={onChangePrivacyTermsAck} 
              />
            }
            className={styles.checkbox}
            label={labelPrivacyTermsAck}
          />

          <FormControlLabel
            control={
              <Checkbox 
                name="licitOrigin" 
                checked={donation.consent.consentLicitOrigin} 
                onChange={onChangeLicitOrigin} 
              />
            }
            label={labelLicitOrigin}
            className={styles.checkbox}
          />
        </FormGroup>

        <FormHelperText>
          {donation.consent.error
            ?  (!donation.consent.consentLicitOrigin && !donation.consent.privacyTermsAck)
              ? errorBoth
              : (!donation.consent.consentLicitOrigin)
                ? errorLicitOrigin
                : errorPrivacyTermsAck
            : ''
          }
        </FormHelperText>

      </FormControl>
  </div>


  function onChangePrivacyTermsAck () {
    const selection = !donation.consent.privacyTermsAck;
    push(ReditusEvent.click, `Mark T&C checkbox: ${selection}`);
    donation.consent.setPrivacyTermsAck(selection);
  }

  function onChangeLicitOrigin () {
    const selection = !donation.consent.consentLicitOrigin;
    push(ReditusEvent.click, `Mark T&C checkbox: ${selection}`);
    donation.consent.setConsentLicitOrigin(selection);
  }
}

