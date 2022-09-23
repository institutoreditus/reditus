import { useContext } from "react";

import styles from "../Form.module.css";
import RoxContainer from "../../services/rox/RoxContainer";
import service from "../../services/rox/RoxService";
import { ReditusEvent, push } from "../../helpers/gtm";
import {DonationContext} from '../contexts/Donation';


service(RoxContainer);


export default function ValueDefaultOptions (props: any) {

  const donation = useContext(DonationContext)

  const options : number[] = (
    donation.mode.value === 'subscriptions'
      ? RoxContainer.suggestedMonthlyDonationValues
      : RoxContainer.suggestedSingleDonationValues 
  ).getValue().split("|", 3).map((x: string) => Number(x));


  return (
    <div className={styles.defaultValues}>

      {options.map((op, idx) => {
        return <Option key={idx} value={op}/>
      })}
    </div>
  );
};


function Option ({value}:{value: number}) {
  
  const donation = useContext(DonationContext)

  function update () {
    push(ReditusEvent.click, `Select ${value}`);
    donation.value.set(Number(value));
  };
  
  return <>
    <input
      className={styles.defaultValues__value}
      type="radio"
      name="amountInCents"
      checked={value === donation.value.value}
      onChange={(e: any) => {}}
    />
    <label
      className={styles.defaultValues__value}
      htmlFor="firstDefaultValue"
      onClick={update}
    >
      R$ {value}
    </label>
  </>
}