import { useContext } from "react";

import styles from "../Form.module.css";
import RoxContainer from "../../services/rox/RoxContainer";
import service from "../../services/rox/RoxService";
import { ReditusEvent, push } from "../../helpers/gtm";
import {DonationContext} from '../contexts/DonationContext';


service(RoxContainer);


export default function ValueDefaultOptions (props: any) {

  const donation = useContext(DonationContext)

  return (<>
      <p className="title">
        {`Selecione o valor da sua doação ${donation.isMonthly ? 'mensal' : ''}`}
      </p>
      <div className={styles.valueOptions}>

        {donation.valueOptions.map((op, idx) => {
          return <NewOption key={idx} value={op}/>
        })}

      </div>
    </>
  );
};


function OtherValue () {

  const donation = useContext(DonationContext)

  return <div className={styles.otherValue} onClick={()=>{
    donation.value.set(200)
  }}>
    Outro valor
  </div>
}

function NewOption ({value}:{value: number}) {

  const donation = useContext(DonationContext)

  function update () {
    push(ReditusEvent.click, `Select ${value}`);
    donation.value.set(Number(value));
  };
  
  return <>
    <input
      className={styles.valueOption}
      type="radio"
      name="amountInCents"
      checked={value === donation.value.value}
      onChange={(e: any) => {}}
    />
    <label
      className={styles.valueOption}
      htmlFor="firstDefaultValue"
      onClick={update}
    >
      <div className={styles.valueOption__emoji}>🍕</div>
      <h3>{`R$ ${value}`}</h3>
      <p>Uma pizza</p>
    </label>
  </>

}


function PreviousOption ({value}:{value: number}) {
  
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