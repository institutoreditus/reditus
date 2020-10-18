import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Done from "@material-ui/icons/Done";
import DoneAll from "@material-ui/icons/DoneAll";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "./actions/donationFormData";
import useStyles from "./styles";

type FormInputs = {
  donationMode: string;
};

const SelectDonationMode = ({ handleNext }: any) => {
  const classes = useStyles();
  const { register, handleSubmit, setValue } = useForm<FormInputs>();
  const { action } = useStateMachine(updateAction);
  const onSubmit = (donationFormData: FormInputs) => {
    action(donationFormData);
    console.log(donationFormData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          className={classes.headlineStep}
          variant="body2"
          color="inherit"
        >
          Faça parte dessa corrente do bem! Ajude a fomentar uma cultura de
          retribuição.
        </Typography>

        <Button
          name="donationMode"
          value="subscriptions"
          ref={register}
          variant="outlined"
          color="primary"
          fullWidth={true}
          type="submit"
          startIcon={<DoneAll />}
          onClick={() => {
            setValue("donationMode", "subscriptions");
            setTimeout(() => {
              handleNext();
            }, 1);
          }}
        >
          Doar mensalmente
        </Button>

        <Button
          name="donationMode"
          value="contributions"
          ref={register}
          variant="outlined"
          color="primary"
          fullWidth={true}
          type="submit"
          startIcon={<Done />}
          onClick={() => {
            setValue("donationMode", "contributions");
            setTimeout(() => {
              handleNext();
            }, 1);
          }}
        >
          Doar um única vez
        </Button>
      </form>
    </>
  );
};

export default SelectDonationMode;
