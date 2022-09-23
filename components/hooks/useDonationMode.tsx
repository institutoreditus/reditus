import { useState } from "react";
import { DonationMode } from "./useDonation";


export default function useDonationMode () {

    const [donationMode, setDonationMode] = useState<DonationMode>('subscriptions');
    const [error, setError] = useState(false);

    return {
        value: donationMode, 
        error,
        set: setDonationMode,
        clear
    };

    function clear() {
        setError(false);
    }
}

export const DonationModeInit : ReturnType<typeof useDonationMode> = {
    value: 'subscriptions',
    error: false,
    clear: () => {},
    set: (value)=>{},
}