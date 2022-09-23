import { SetStateAction, useState } from "react";
import { isValidBirthday } from "../../helpers/datehelper";



export default function useBirthday () {

    const [selectedBirthday, setSelectedBirthday] = useState<Date | null>(null);
    const [error, setError] = useState(false);

    return {
        value: selectedBirthday, 
        error,
        set: setSelectedBirthday,
        validate, clear
    };

    function validate() {
        if (!isValidBirthday(selectedBirthday)) {
            setError(true);
        }
    }

    function clear() {
        setError(false);
    }
}

export const BirthdayInit : ReturnType<typeof useBirthday> = {
    value: null,
    error: false,
    validate: () => {},
    clear: () => {},
    set: (value)=>{},
}