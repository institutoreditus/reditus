import { useState } from "react";

export type DonationMode = 'subscriptions' | 'contributions';

export type Form = {
    donationMode: DonationMode,
    amountInCents: number,
    email: string,
    birthday: Date | string,
    userExists: boolean
}
type FormKeys = keyof Form;


export default function useDonation () {

    const [form, setForm] = useState<Form>({
        donationMode: "subscriptions",
        amountInCents: 0,
        email: "",
        birthday: "",
        userExists: false,
    });
    
    function updateForm (formKey: FormKeys, value: any) {
        setForm({
            ...form,
            [formKey]: value
        });
    };

    return {form, updateForm};
}


export const DonationInit : ReturnType<typeof useDonation> = {
    form: {
        donationMode: "subscriptions",
        amountInCents: 0,
        email: "",
        birthday: "",
        userExists: false
    },
    updateForm: (key, value)=>{},
}