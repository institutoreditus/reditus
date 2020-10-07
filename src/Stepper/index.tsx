import React from "react";
import SelectDonationMode from "./SelectDonationMode";
import InputDonationAmount from "./InputDonationAmount";
import Result from "./Result";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import updateAction from "./actions/donationFormData";
import donationFormData from "./states/donationFormData";
import { createStore, useStateMachine } from "little-state-machine";
import useStyles from "./styles";

createStore({
  donationFormData,
});

function getSteps() {
  return ["Select donation mode", "Input donation amount"];
}

export default function DonationStepper(props: any) {
  const { action } = useStateMachine(updateAction, { shouldReRenderApp: true });
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleMessage = async (message: string) => {
    action({ finalDonationMessage: message });
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <SelectDonationMode handleNext={handleNext} />;
      case 1:
        return (
          <InputDonationAmount
            handleNext={handleNext}
            handleMessage={handleMessage}
          />
        );
      default:
        return <Result {...props} />;
    }
  }
  return (
    <>
      {/* Endpoint step*/}
      {activeStep === steps.length ? (
        <Box>
          <IconButton
            onClick={handleReset}
            color="primary"
            aria-label="Back home step"
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <Result {...props} />
        </Box>
      ) : activeStep >= 0 ? (
        <div>
          {/* Navigation steps*/}
          {activeStep === 1 ? (
            <IconButton
              disabled={activeStep !== steps.length && activeStep !== 1}
              onClick={handleBack}
              color="primary"
              aria-label="Back step"
            >
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
          ) : null}

          {/* <Button disabled={activeStep === 0} variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>*}
              
          {/*Content steps*/}
          <Box className={classes.contentSteps}>
            {getStepContent(activeStep)}
          </Box>
        </div>
      ) : null}
    </>
  );
}
