import { useState, createContext } from "react";
import useBirthday, { BirthdayInit } from "../hooks/useBirthday";
import useConsent, { ConsentInit } from "../hooks/useConsent";
import useDonation, {DonationInit} from "../hooks/useDonation";
import useDonationMode, { DonationModeInit } from "../hooks/useDonationMode";
import useDonationValue, { DonationValueInit } from "../hooks/useDonationValue";

type DonationContextValues = {
    // donation: ReturnType<typeof useDonation>,
    value: ReturnType<typeof useDonationValue>,
    mode: ReturnType<typeof useDonationMode>,
    birthday: ReturnType<typeof useBirthday>,
    consent: ReturnType<typeof useConsent>,
    validate: () => boolean,

    email: {value: string, set: (v: string) => void}
    userExists: {value: boolean, set: (v: boolean) => void}
}

const initialValues : DonationContextValues = {
    // donation: DonationInit,
    value: DonationValueInit, 
    mode: DonationModeInit, 
    birthday: BirthdayInit, 
    consent: ConsentInit,
    validate: ()=>true,
    email: {value: '', set: (v)=>{}},
    userExists: {value: false, set: (v)=>{}}
}

export const DonationContext = createContext<DonationContextValues>(initialValues);



export default function DonationProvider ({children} : {children: JSX.Element}) {

    const [userExists, setUserExists] = useState(false);
    const [email, setEmail] = useState<string>('');

    // const donation = useDonation();
    const donationValue = useDonationValue();
    const donationMode = useDonationMode();
    const birthday = useBirthday();
    const consent = useConsent();

    const values = {
        value: donationValue, mode: donationMode, birthday, consent, validate,
        userExists: {value: userExists, set: setUserExists},
        email: {value: email, set: setEmail},
    }

    return <DonationContext.Provider value={values}> 
        {children}
    </DonationContext.Provider>

    function validate() {
        return birthday.validate() && consent.validate() && donationValue.validate();
    }
}