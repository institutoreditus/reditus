import { useContext, useRef, useState } from "react";

import styles from "../Form.module.css";
import RoxContainer from "../../services/rox/RoxContainer";
import service from "../../services/rox/RoxService";
import { ReditusEvent, push } from "../../helpers/gtm";
import { DonationContext } from "../contexts/DonationContext";
import InputValue from "./InputValue";
import { FormHelperText } from "@material-ui/core";

service(RoxContainer);

export default function ValueDefaultOptions(props: any) {
  const donation = useContext(DonationContext);

  return (
    <>
      <div className={styles.valueOptions}>
        {donation.valueOptions.map((op, idx) => {
          const comparison = compareWith(op, idx);
          return (
            <Option key={idx} value={op} index={idx} comparison={comparison} />
          );
        })}

        <InputValueBox />
      </div>
    </>
  );

  function compareWith(
    v: number,
    idx: number
  ): { emoji: string; name: string; price: number } {
    const options = [
      { emoji: "🍔", name: "um lanche", price: 30 },
      { emoji: "🍕", name: "uma pizza", price: 75 },
      { emoji: "🍲", name: "um jantar chique", price: 100 },
      { emoji: "💇‍♀️", name: "uma ida ao salão", price: 150 },
      { emoji: "👞", name: "um par de sapatos", price: 250 },
      { emoji: "⛽", name: "um tanque cheio", price: 500 },
    ];

    const opt = options[0];
    for (let i = 0; i < options.length - 1; i++) {
      if (options[i + 1].price > v) {
        return options[i];
      }
    }

    return options[options.length - 1];
  }
}

function Option({
  value,
  index,
  comparison,
}: {
  value: number;
  index: number;
  comparison: { emoji: string; name: string; price: number };
}) {
  const donation = useContext(DonationContext);

  function update() {
    push(ReditusEvent.click, `Select ${value}`);
    donation.value.set(Number(value));
    donation.setIsInputingValue(false);
  }

  return (
    <>
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
        <p>{`equivale a ${comparison.name}`}</p>
      </label>
    </>
  );
}

export function InputValueBox() {
  const donation = useContext(DonationContext);
  const ref = useRef<HTMLInputElement | null>(null);
  const [showError, setShowError] = useState(false);

  return (
    <>
      <input
        className={styles.valueOption}
        type="radio"
        name="amountInCents"
        checked={donation.isInputingValue}
        onChange={(e: any) => {}}
      />
      <label
        className={styles.valueOption}
        htmlFor="firstDefaultValue"
        onClick={onClick}
      >
        <p>Doar outro valor</p>

        {donation.isInputingValue ? (
          <>
            <div className={styles.valueInputWrapper}>
              <h3>R$</h3>
              <input
                name="price"
                id="price"
                required
                ref={ref}
                className={styles.valueOptionInput}
                type="number"
                onInput={onInput}
                value={donation.value.value}
              />
            </div>
            {donation.value.error && (
              <FormHelperText
                id="input-value-component-error-text"
                style={{ margin: 0 }}
              >
                No mínimo, 5 reais.
              </FormHelperText>
            )}
          </>
        ) : (
          <></>
        )}
      </label>
    </>
  );

  function onInput() {
    if (ref.current) {
      const value = Number(ref.current.value);
      push(ReditusEvent.type, `Donate custom value: ${value}`);
      donation.value.set(value);
    }
  }

  function onClick() {
    donation.setIsInputingValue(true);
  }
}
