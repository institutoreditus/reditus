import NumberFormat from "react-number-format";
import { TextField } from "@rmwc/textfield";
import { useContext } from "react";
import { FormControl, FormHelperText } from "@material-ui/core";

import styles from "../Form.module.css";
import { ReditusEvent, push } from "../../helpers/gtm";
import { DonationContext } from "../contexts/DonationContext";

export const InputValue = () => {
  const donation = useContext(DonationContext);

  return (
    <div id={styles.customValue}>
      <FormControl error={donation.value.error} fullWidth={true}>
        {donation.isInputingValue ? (
          <NumberFormat
            label="Digite o valor..."
            prefix={"R$"}
            id={styles.customValue__input}
            name="amountInCents"
            customInput={TextField}
            thousandSeparator={true}
            allowNegative={false}
            onValueChange={(values) => {
              const value = values.value;
              push(ReditusEvent.type, `Donate custom value: ${value}`);
              donation.value.set(Number(value));
            }}
            value={donation.value.value}
            fullwidth
          />
        ) : (
          <></>
        )}

        {donation.value.error && (
          <FormHelperText
            id="input-value-component-error-text"
            style={{ margin: 0 }}
          >
            O valor da doação deve ser, no minimo, 5 reais.
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default InputValue;
