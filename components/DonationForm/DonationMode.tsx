import { Checkbox } from "@rmwc/checkbox";
import Switch from "react-switch";

import { useContext } from "react";
import { FormControl } from "@material-ui/core";
import styles from "../Form.module.css";
import { ReditusEvent, push } from "../../helpers/gtm";

import {DonationContext} from '../contexts/DonationContext';

export const DonationMode = (props: any) => {

  const donation = useContext(DonationContext)

  return (
    <div style={{ display: "inline-block", marginTop: "1.5rem" }}>
        <Switch 
          onChange={(e: any) => {
            donation.mode.set(donation.isMonthly ? 'contributions' : 'subscriptions');
            push(ReditusEvent.click, `Select donation mode: ${donation.isMonthly ? true : false}`);
          }}
          checked={donation.isMonthly}
          height={24}
          handleDiameter={20}
          borderRadius={24}
          onColor='#75d4fe'
        />
        <label>Doar mensalmente</label>
{/* 
      <FormControl fullWidth={true}>

        <Checkbox
          className={styles.checkbox}
          label={
            <div>Quero doar esse valor mensalmente</div>
          }
          type="checkbox"
          name="modeCheckbox"
          onChange={(e: any) => {
            push(
              ReditusEvent.click,
              `Select donation mode: ${e.target.checked}`
            );
          }}
          onClick={()=>{
            donation.mode.set(donation.isMonthly ? 'contributions' : 'subscriptions')
          }}
          checked={donation.isMonthly}
        />

      </FormControl> */}
    </div>
  );
};

export default DonationMode;
