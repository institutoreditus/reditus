import { Checkbox } from "@rmwc/checkbox";

import { useContext } from "react";
import { FormControl, FormHelperText } from "@material-ui/core";
import styles from "../Form.module.css";
import Link from "next/link";
import { ReditusEvent, push } from "../../helpers/gtm";

import { DonationContext } from "../contexts/DonationContext";
import InputValue from "./InputValue";

export const ConsentCheckboxes = (props: any) => {
  const donation = useContext(DonationContext);

  return (
    <div className={styles.consentWrapper}>
      <FormControl error={donation.consent.error} fullWidth={true}>
        <Checkbox
          className={styles.checkbox}
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
            push(ReditusEvent.click, `Mark T&C checkbox: ${e.target.checked}`);
            donation.consent.setPrivacyTermsAck(e.target.checked);
          }}
        />

        <Checkbox
          className={styles.checkbox}
          label={
            <div style={{ fontSize: 13 }}>
              Declaro que as quantias doadas não são produto de crime ou
              oriundas de quaisquer atividades ilícitas.
            </div>
          }
          type="checkbox"
          name="consentLicitOriginCheckbox"
          onChange={(e: any) => {
            push(ReditusEvent.click, `Mark T&C checkbox: ${e.target.checked}`);
            donation.consent.setConsentLicitOrigin(e.target.checked);
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
            Para prosseguir também precisamos que você confirme que a origem da
            doação é lícita.
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default ConsentCheckboxes;
