import { NavigationButtons } from "./action_navigate/NavigationButtons";

export const FailedDonation = (props: any) => {
  const submit = () => {
    alert('You did it! Yay!') // eslint-disable-line
  };

  return (
    <div>
      <NavigationButtons step={4} {...props} previousStep={submit} />

      <h1>Doação não concluida!</h1>
      <p>
        Ops! Por algum motivo sua doação não foi concluida com sucesso. Mas
        calma que nós vamos te ajudar!
      </p>
      <p>
        Entre em contato com a gente em{" "}
        <a href="mailto:contato@reditus.org.br">
          <font color="#00d4ff">contato@reditus.org.br</font>
        </a>{" "}
        para finalizarmos a sua contribuição, ou volte e tente novamente.
      </p>
      <details>
        <summary>Mais detalhes</summary>
        <p>
          Os motivos mais comuns de falha são:
          <ul>
            <li>Erros nos dados do cartāo.</li>
            <li>Não autorização da transação pelo banco emissor.</li>
            <li>
              Uso de VPNs ou soluções similares de tunelamento na hora da
              doação.
            </li>
          </ul>
        </p>
        <p>
          Caso haja mais duvidas, não hesite em nos contatar. Agradecemos sua
          contribuição!
        </p>
      </details>
    </div>
  );
};

export default FailedDonation;
