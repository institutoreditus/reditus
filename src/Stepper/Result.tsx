import React from "react";
import Box from "@material-ui/core/Box";
import { useStateMachine } from "little-state-machine";
import updateAction from "./actions/donationFormData";

import Typography from "@material-ui/core/Typography";

const Result = () => {
  const { state } = useStateMachine(updateAction, { shouldReRenderApp: true });
  return (
    <Box>
      <br />
      <Typography variant="h5">
        <Box fontWeight="fontWeightBold">
          {state.donationFormData.finalDonationMessage}
        </Box>
      </Typography>
      <br />
      <br />
    </Box>
  );
};

export default Result;
