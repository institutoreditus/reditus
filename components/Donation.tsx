import React, { useState } from "react";
import StepWizard from "react-step-wizard";

// Components

import SelectDonationMode from "./SelectDonationMode";
import DonationForm from "./DonationForm";
import SuccessDonation from "./SuccessDonation";
import FailedDonation from "./FailedDonation";

export const Donation = () => {
  const [state, updateState] = useState({
    form: {
      donationMode: "",
      amountInCents: 0,
      email: "",
      birthday: "",
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
      <StepWizard
        isHashEnabled={false}
        isLazyMount={true}
        instance={setInstance}
      >
        <SelectDonationMode form={state.form} update={updateForm} />
        <DonationForm form={state.form} update={updateForm} />
        <SuccessDonation form={state.form} />
        <FailedDonation />
      </StepWizard>
    </>
  );
};

export default Donation;
