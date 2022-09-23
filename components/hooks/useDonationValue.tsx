import { useState } from "react";


export default function useDonationValue () {

    const [donationValue, setDonationValue] = useState<number>(0);
    const [error, setError] = useState(false);

    return {
        value: donationValue, 
        error,
        set,
        validate, clear
    };

    function validate() {
        let hasError = false;
        if (donationValue < 5.0) {
            hasError = true;
        }
        setError(hasError);
        return hasError;
    }

    function set(value: number) {
        setDonationValue(value);
        setError(false)
    }

    function clear() {
        setDonationValue(0);
    }
}

export const DonationValueInit : ReturnType<typeof useDonationValue> = {
    value: 0,
    error: false,
    validate: () => true,
    clear: () => {},
    set: (value)=>{},
}