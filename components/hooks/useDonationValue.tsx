import { useState } from "react";


export default function useDonationValue () {

    const [donationValue, setDonationValue] = useState<number>(0);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    return {
        value: donationValue, 
        error, errorMessage,
        set,
        validate, clear
    };

    function validate(value?: number) {
        let hasError = false;
        const test = value ? value : donationValue;
        if (test < 5.0) {
            hasError = true;
            setErrorMessage('Por favor, escolha um valor para doação de, no minimo, 5 reais.');
        }
        setError(hasError);
        return hasError;
    }

    function set(value: number) {
        setDonationValue(value);
        validate(value);
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
    errorMessage: ''
}