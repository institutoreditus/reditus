import React from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "./actions/donationFormData";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MuiCurrencyFormat from "../components/MuiCurrencyFormat";
import onCheckout from "../components/Checkout";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";

type FormInputs = {
  amountInCents: number;
};

export const InputDonationAmount = ({ handleNext, handleMessage }: any) => {
  const classes = useStyles();
  const { register, handleSubmit, setValue, control } = useForm<FormInputs>();
  const { action } = useStateMachine(updateAction, {
    shouldReRenderApp: true,
  });

  const onSubmit = (donationFormData: any, e: any) => {
    action(donationFormData);
    onCheckout(e, donationFormData, handleNext, handleMessage);
  };

  const amountInCents = useWatch({
    control,
    name: "amountInCents",
    defaultValue: 0,
  });

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ButtonGroup variant="outlined">
          <Button
            value={25}
            className={classes.inputDefaultAmount}
            color="primary"
            name="amountInCents"
            onClick={() => setValue("amountInCents", 25)}
            ref={register}
          >
            R$ 25
          </Button>
          <Button
            value={75}
            className={classes.inputDefaultAmount}
            color="primary"
            name="amountInCents"
            onClick={() => setValue("amountInCents", 75)}
            ref={register}
          >
            R$ 75
          </Button>
          <Button
            value={150}
            className={classes.inputDefaultAmount}
            color="primary"
            name="amountInCents"
            onClick={() => setValue("amountInCents", 150)}
            ref={register}
          >
            R$ 150
          </Button>
        </ButtonGroup>

        <Controller
          name="amountInCents"
          className={classes.inputCustomAmount}
          control={control}
          as={MuiCurrencyFormat}
          ref={register}
          label={"Quero doar outro valor..."}
        />

        <Typography className={classes.amountInCentsWatched} variant="body2">
          Vou doar: R$ {amountInCents}
        </Typography>

        <Button type="submit" fullWidth={true} ref={register}>
          Confirmar valor
        </Button>
      </form>

      {/* <pre>{JSON.stringify(state, null, 2)}</pre>*/}
    </Box>
  );
};

export default InputDonationAmount;
