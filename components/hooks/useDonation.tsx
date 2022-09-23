import { useState } from "react";

export type DonationMode = 'subscriptions' | 'contributions';

export type Form = {
    donationMode: DonationMode,
    amountInCents: number,
    email: string,
    birthday: Date | string,
}
type FormKeys = keyof Form;


export default function useDonation () {

    const [state, updateState] = useState<Form>({
        donationMode: "subscriptions",
        amountInCents: 0,
        email: "",
        birthday: "",
    });
    
    function update (formKey: FormKeys, value: any) {
        updateState({
            ...state,
            [formKey]: value
        });
    };

    return {state, update};
}


export const DonationInit : ReturnType<typeof useDonation> = {
    state: {
        donationMode: "subscriptions",
        amountInCents: 0,
        email: "",
        birthday: "",
    },
    update: (key, value)=>{},
}