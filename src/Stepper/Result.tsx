import React from "react";
import Box from "@material-ui/core/Box";
import { useStateMachine } from "little-state-machine";
import updateAction from "./actions/donationFormData";

import Typography from "@material-ui/core/Typography";

const Result = () => {
  const { state } = useStateMachine(updateAction, { shouldReRenderApp: true });

  const successHeadlineMessage = "Doação concluída com sucesso!";
  const successParagraphMessage =
    "Agradecemos por escolher fazer parte dessa iniciativa. Te enviaremos também um email de confirmação da sua doação.";
  const failedParagraphMessage =
    " Por algum motivo sua doação não foi efetuada. Por favor, retorne e tente mais uma vez.";

  return (
    <Box>
      <br />
      <Typography variant="h5">
        <Box fontWeight="fontWeightBold">
          {state.donationFormData.finalDonationMessage}
        </Box>
      </Typography>
      <p>
        {state.donationFormData.finalDonationMessage == successHeadlineMessage
          ? successParagraphMessage
          : failedParagraphMessage}
      </p>
      <br />
      <br />
    </Box>
  );
};

export default Result;
