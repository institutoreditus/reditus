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
        Por algum motivo sua doação não foi efetuada. Retorne e tente mais uma
        vez.
      </p>
    </div>
  );
};

 export default FailedDonation;