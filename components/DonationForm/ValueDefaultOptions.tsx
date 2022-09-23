import { useContext } from "react";

import styles from "./Form.module.css";
import RoxContainer from "../../services/rox/RoxContainer";
import service from "../../services/rox/RoxService";
import { ReditusEvent, push } from "../../helpers/gtm";
import {DonationContext} from '../contexts/Donation';


service(RoxContainer);


let checkedRadio: any;

export const ValueDefaultOptions = (props: any) => {

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
  );
};

export default ValueDefaultOptions;
