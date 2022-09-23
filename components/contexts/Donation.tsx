import { useState, createContext } from "react";
import useBirthday, { BirthdayInit } from "../hooks/useBirthday";
import useConsent, { ConsentInit } from "../hooks/useConsent";
import useDonation, {DonationInit} from "../hooks/useDonation";
import useDonationMode, { DonationModeInit } from "../hooks/useDonationMode";
import useDonationValue, { DonationValueInit } from "../hooks/useDonationValue";

type DonationContextValues = {
    donation: typeof useDonation,
    donationValue: typeof useDonation,
    donationMode: typeof useDonation,
    birthday: typeof useDonation,
    consent: typeof useDonation,
    validate: () => void
}

const DonationContext = createContext({
    donation: DonationInit,
    donationValue: DonationValueInit, 
    donationMode: DonationModeInit, 
    birthday: BirthdayInit, 
    consent: ConsentInit,
    validate: ()=>{}
});



export default function DonationProvider ({children} : {children: JSX.Element}) {

    const donation = useDonation();

    const donationValue = useDonationValue();
    const donationMode = useDonationMode();
    const birthday = useBirthday();
    const consent = useConsent();

    const values = {
        donation, donationValue, donationMode, birthday, consent, validate
    }

    return <DonationContext.Provider value={values}> 
        {children}
    </DonationContext.Provider>

    function validate() {
        birthday.validate();
        consent.validate();
        donationValue.validate();
    }
}