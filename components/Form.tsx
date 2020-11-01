import React, { useState } from "react";
import StepWizard from "react-step-wizard";

// Components

import SelectDonationMode from "./SelectDonationMode";
import InputDonationValues from "./InputDonationValues";
import SuccessDonation from "./SuccessDonation";
import FailedDonation from "./FailedDonation";

export const Form = () => {
  const [state, updateState] = useState({
    form: {
      donationMode: "",
      amountInCents: 0,
      email: "",
    },
  });

  const updateForm = (key: any, value: any) => {
    const { form }: any = state;

    form[key] = value;
    updateState({
      ...state,
      form,
    });
  };

  const setInstance = (SW: any) =>
    updateState({
      ...state,
      ...SW,
    });

  return (
    <>
      <StepWizard isHashEnabled={false} isLazyMount={true} instance={setInstance}>
        <SelectDonationMode form={state.form} update={updateForm} />
        <InputDonationValues form={state.form} update={updateForm} />
        <SuccessDonation form={state.form} />
        <FailedDonation />
      </StepWizard>
    </>
  );
};

export default Form;
