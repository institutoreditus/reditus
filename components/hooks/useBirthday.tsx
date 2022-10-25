import { SetStateAction, useState } from "react";
import { isValidBirthday } from "../../helpers/datehelper";

export default function useBirthday() {
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return {
    value: birthday,
    error,
    set,
    validate,
    clear,
    errorMessage,
  };

  function validate(value?: Date | null) {
    let hasError = false;
    let msg = "";

    const testValue = value ? value : birthday;
    const [isValid, message] = isValidBirthday(testValue);

    if (!isValid) {
      hasError = true;
      msg = message;
    }
    setError(hasError);
    setErrorMessage(msg);
    return hasError;
  }

  function clear() {
    setError(false);
  }

  function set(value: Date | null) {
    setBirthday(value);
    validate(value);
  }
}

export const BirthdayInit: ReturnType<typeof useBirthday> = {
  value: null,
  error: false,
  validate: () => true,
  clear: () => {},
  set: (value) => {},
  errorMessage: "",
};
