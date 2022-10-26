import React from "react";
import StepWizard from "react-step-wizard";

// Components

import DonationForm from "./DonationForm";
import SuccessDonation from "./SuccessDonation";
import FailedDonation from "./FailedDonation";
import DonationProvider from "./contexts/DonationContext";

export const Donation = () => {
  const setInstance = () => {};
  return (
    <DonationProvider>
      <StepWizard
        isHashEnabled={false}
        isLazyMount={true}
        instance={setInstance}
      >
        <DonationForm />
        <SuccessDonation />
        <FailedDonation />
      </StepWizard>
    </DonationProvider>
  );
};

export default Donation;
