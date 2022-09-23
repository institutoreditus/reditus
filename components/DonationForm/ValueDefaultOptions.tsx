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
          
          const comparison = compareWith(op, idx);
          return <NewOption key={idx} value={op} index={idx} comparison={comparison}/>
        })}

      </div>
    </>
  );

  function compareWith (v: number, idx: number) : {emoji: string, name: string, price: number} {
    const options = [
      {emoji: '🍔', name: 'lanche', price: 50},
      {emoji: '🍕', name: 'pizza', price: 100},
      {emoji: '🍕', name: 'pizza', price: 100},
    ]
    return options[idx % options.length];
  }
};


function NewOption ({value, index, comparison}:{value: number, index: number, 
  comparison: {emoji: string, name: string, price: number}}) {

  const donation = useContext(DonationContext)

  function update () {
    push(ReditusEvent.click, `Select ${value}`);
    donation.value.set(Number(value));
  };
  
  const amount = Math.ceil(value/comparison.price);

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
      <div className={styles.valueOption__emoji}>{comparison.emoji}</div>
      <h3>{`R$ ${value}`}</h3>
      <p>{`Menos que ${amount} ${comparison.name + (amount > 1 ? 's' : '')}`}</p>
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