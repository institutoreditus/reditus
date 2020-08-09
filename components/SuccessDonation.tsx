import { NavigationButtons } from "./action_navigate/NavigationButtons";

 export const SuccessDonation = (props: any) => {
  const submit = () => {
          alert('You did it! Yay!') // eslint-disable-line
  };

   return (
    <div>
      {/* <NavigationButtons step={3} {...props} previousStep={submit} /> */}

       <h1>Doação concluída com sucesso!</h1>
      <p>
        Agradecemos por escolher fazer parte dessa iniciativa. Te enviaremos
        também um email de confirmação da sua doação.
      </p>
    </div>
  );
};

 export default SuccessDonation;