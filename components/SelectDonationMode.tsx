import ContributionButton from "./checkout_buttons/ContributionButton";
import { SubscriptionButton } from "./checkout_buttons/SubscriptionButton";
import styles from "./Form.module.css";

const SelectDonationMode = (props: any) => {
  return (
    <div className={styles.donationModeWrapper}>
      {/* <p className="title">
        Faça parte dessa corrente do bem! Ajude a fomentar uma cultura de
        retribuição.
        </p>
      */}

      {/* December donation campaign headline */}
      <p className={styles.title}>
        <b>
          Ao longo do mês de dezembro de 2021, novas doações recorrentes terão
          sua primeira parcela <u>quintuplicada</u> pelos nossos apoiadores!
        </b>
      </p>
      <SubscriptionButton step={1} {...props} />
      <ContributionButton step={1} {...props} />

      <div className={styles.textItems}>
        <p>
          *Válido para doações recorrentes iniciadas entre 01 e 31 de dezembro
          de 2021
        </p>
        <p>
          **Para ser validada, a doação recorrente deverá ter duração de no
          mínimo 4 meses
        </p>
        <p>
          ***Limitado a doações de até 500 reais mensais (doações de valor
          superior terão apenas 500 reais quintuplicados)
        </p>
      </div>
    </div>
  );
};

export default SelectDonationMode;
