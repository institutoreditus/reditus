import React, { useState } from "react";
import StepWizard from "react-step-wizard";

// Components

import SelectDonationMode from "./SelectDonationMode";
import DonationForm from "./DonationForm";
import SuccessDonation from "./SuccessDonation";
import FailedDonation from "./FailedDonation";
import DonationProvider from "./contexts/Donation";

export const Donation = () => {

  const setInstance = (SW: any) => {}

  return (
    <DonationProvider>
      <StepWizard
        isHashEnabled={false}
        isLazyMount={true}
        instance={setInstance}
      >
        <SelectDonationMode/>
        <DonationForm/>
        <SuccessDonation/>
        <FailedDonation />
      </StepWizard>
    </DonationProvider>
  );
};

export default Donation;
