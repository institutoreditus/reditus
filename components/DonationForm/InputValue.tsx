import { Checkbox } from "@rmwc/checkbox";

import NumberFormat from "react-number-format";
import { TextField } from "@rmwc/textfield";
import { useContext } from "react";
import { FormControl, FormHelperText } from "@material-ui/core";

import styles from "../Form.module.css";
import { ReditusEvent, push,  } from "../../helpers/gtm";
import {DonationContext} from '../contexts/DonationContext';



export const InputValue = (props: any) => {

  const donation = useContext(DonationContext)

  return (
    <div id={styles.customValue}>
      <FormControl error={donation.value.error} fullWidth={true}>
        <Checkbox
          className={styles.checkbox}
          label={
            <div>Quero doar outro valor</div>
          }
          type="checkbox"
          name="valueCheckbox"
          onChange={(e: any) => {
            push(
              ReditusEvent.click,
              `Select donation value: ${e.target.checked}`
            );
          }}
          onClick={()=>{
            if (donation.selectedAnOption) {
              donation.selectDonateAnotherValue();
            } else {
              donation.unselectDonateAnotherValue();
            }
          }}
          checked={!donation.selectedAnOption}
        />

        {
          !donation.selectedAnOption 
          ?  <NumberFormat
            label="Quero doar outro valor..."
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
          : <></>
        }

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
  );
};

export default InputValue;
