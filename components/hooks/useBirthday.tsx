import { SetStateAction, useState } from "react";
import { isValidBirthday } from "../../helpers/datehelper";



export default function useBirthday () {

    const [selectedBirthday, setSelectedBirthday] = useState<Date | null>(null);
    const [error, setError] = useState(false);

    return {
        value: selectedBirthday, 
        error,
        set,
        validate, clear
    };

    function validate() {
        let hasError = false;
        if (!isValidBirthday(selectedBirthday)) {
            hasError = true;
        }
        setError(hasError);
        return hasError;
    }

    function clear() {
        setError(false);
    }

    function set(value: Date | null) {
        setSelectedBirthday(value);
        validate();
    }
}

export const BirthdayInit : ReturnType<typeof useBirthday> = {
    value: null,
    error: false,
    validate: () => true,
    clear: () => {},
    set: (value)=>{},
}