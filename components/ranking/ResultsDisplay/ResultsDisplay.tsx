import styles from "./index.module.css";

const ResultsDisplay = (props: { amount: number; count: number }) => {
  const formattedAmount = new Intl.NumberFormat("pt-BR", {}).format(
    props.amount
  );

  return (
    <div className={styles.resultsPannel}>
      <div>
        <h3>R$ {formattedAmount}</h3>
        <p>total doado</p>
      </div>
      <div>
        <h3>{props.count}</h3>
        <p>doadores</p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
