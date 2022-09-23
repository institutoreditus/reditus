import React, { useState } from "react";
import StepWizard from "react-step-wizard";

// Components

import EnterForm from "./EnterForm";
import SelectDonationMode from "./SelectDonationMode";
import DonationForm from "./DonationForm";
import SuccessDonation from "./SuccessDonation";
import FailedDonation from "./FailedDonation";
import DonationProvider from "./contexts/DonationContext";

export const Donation = () => {

  const setInstance = (SW: any) => {}

  return (
    <DonationProvider>
      <StepWizard
        isHashEnabled={false}
        isLazyMount={true}
        instance={setInstance}
      >
        <EnterForm/>
        {/* <SelectDonationMode/> */}
        <DonationForm/>
        <SuccessDonation/>
        <FailedDonation />
      </StepWizard>
    </DonationProvider>
  );
};

export default Donation;
