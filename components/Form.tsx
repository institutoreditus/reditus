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
      donationMode: "donationModeHere",
      amountInCents: 0,
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
      <StepWizard isHashEnabled={false} instance={setInstance}>
        <SelectDonationMode form={state.form} update={updateForm} />
        <InputDonationValues form={state.form} update={updateForm} />
        <SuccessDonation />
        <FailedDonation />
      </StepWizard>
    </>
  );
};

export default Form;
