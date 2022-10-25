import NumberFormat from "react-number-format";
import { TextField } from "@rmwc/textfield";
import { useContext } from "react";
import { FormControl, FormHelperText } from "@material-ui/core";

import styles from "../Form.module.css";
import RoxContainer from "../../services/rox/RoxContainer";
import service from "../../services/rox/RoxService";
import { ReditusEvent, push } from "../../helpers/gtm";
import { DonationContext } from "../contexts/Donation";

service(RoxContainer);

let checkedRadio: any;

export const InputValue = () => {
  const donation = useContext(DonationContext);

  return (
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
            Por favor, selecione ou forneça um valor para doação de, no minimo,
            5 reais.
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default InputValue;
