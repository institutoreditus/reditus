import {  useContext } from "react";
import { FormControl, FormHelperText } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";

import EventIcon from "@material-ui/icons/Event";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {DonationContext} from '../contexts/DonationContext';
import styles from "../Form.module.css";


const useStyles = makeStyles(() =>
  createStyles({
    picker: {
      width: "100%",
      marginTop: 5,
      paddingTop: 0,
    },
    datePickerIcon: {
      color: "rgba(255, 255, 255, 0.692)",
      "&:hover": {
        color: "#00d4ff",
      },
    },
    "&.MuiPickersToolbarButton-toolbarBtn": {
      fontSize: "40px !important",
    },
  })
);


export const SelectBirthday = (props: any) => {

  const classes = useStyles();
  const donation = useContext(DonationContext)

  return (<>
    <FormControl error={donation.birthday.error} fullWidth={true}>
      <div className={styles.birthdayWrapper}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <Grid container>
            <KeyboardDatePicker
              name="birthday"
              margin="normal"
              id="date-picker-dialog"
              label="Data de nascimento"
              format="dd/MM/yyyy"
              color="primary"
              className={classes.picker}
              value={donation.birthday.value}
              onChange={(date: Date | null) => {
                donation.birthday.set(date)
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              keyboardIcon={
                <EventIcon className={classes.datePickerIcon} />
              }
              invalidDateMessage={null}
              maxDateMessage={null}
              minDateMessage={null}
              autoOk
              disableFuture
              views={["year", "month", "date"]}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {donation.birthday.error && (
          <FormHelperText
            id="input-value-birthday-error-text"
            style={{ margin: 0 }}
          >
            {donation.birthday.errorMessage}
          </FormHelperText>
        )}
      </div>
    </FormControl>
    </>
  );
};

export default SelectBirthday;
