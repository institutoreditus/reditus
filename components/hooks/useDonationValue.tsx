import { useState } from "react";


export default function useDonationValue () {

    const [donationValue, setDonationValue] = useState<number>(0);
    const [error, setError] = useState(false);

    return {
        value: donationValue, 
        error,
        set: setDonationValue,
        validate, clear
    };

    function validate() {
        
    }

    function clear() {
        setDonationValue(0);
    }
}

export const DonationValueInit : ReturnType<typeof useDonationValue> = {
    value: 0,
    error: false,
    validate: () => {},
    clear: () => {},
    set: (value)=>{},
}