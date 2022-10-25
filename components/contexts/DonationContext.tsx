import { useState, createContext } from "react";
import useBirthday, { BirthdayInit } from "../hooks/useBirthday";
import useConsent, { ConsentInit } from "../hooks/useConsent";
import useDonationMode, { DonationModeInit } from "../hooks/useDonationMode";
import useDonationValue, { DonationValueInit } from "../hooks/useDonationValue";
import RoxContainer from "../../services/rox/RoxContainer";
import service from "../../services/rox/RoxService";

service(RoxContainer);

type DonationContextValues = {
  value: ReturnType<typeof useDonationValue>;
  mode: ReturnType<typeof useDonationMode>;
  birthday: ReturnType<typeof useBirthday>;
  consent: ReturnType<typeof useConsent>;
  validate: () => boolean;

  email: { value: string; set: (v: string) => void };
  userExists: { value: boolean; set: (v: boolean) => void };

  isMonthly: boolean;
  valueOptions: number[];

  selectDonateAnotherValue: () => void;
  selectOption: () => void;

  isInputingValue: boolean;
  setIsInputingValue: (v: boolean) => void;
};

const initialValues: DonationContextValues = {
  value: DonationValueInit,
  mode: DonationModeInit,
  birthday: BirthdayInit,
  consent: ConsentInit,
  validate: () => true,
  email: { value: "", set: (v) => {} },
  userExists: { value: false, set: (v) => {} },
  isMonthly: true,
  valueOptions: [],
  selectDonateAnotherValue: () => {},
  selectOption: () => {},
  isInputingValue: false,
  setIsInputingValue: (v) => {},
};

export const DonationContext = createContext<DonationContextValues>(
  initialValues
);

export default function DonationProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [userExists, setUserExists] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [isInputingValue, setIsInputingValue] = useState<boolean>(false);

  const donationValue = useDonationValue();
  const donationMode = useDonationMode();
  const birthday = useBirthday();
  const consent = useConsent();

  const isMonthly = donationMode.value === "subscriptions";

  const valueOptions = [50, 75, 150, 250, 500];

  const values = {
    value: donationValue,
    mode: donationMode,
    birthday,
    consent,
    validate,
    userExists: { value: userExists, set: setUserExists },
    email: { value: email, set: setEmail },
    isMonthly,
    valueOptions,

    selectDonateAnotherValue,
    selectOption,
    isInputingValue,
    setIsInputingValue,
  };

  return (
    <DonationContext.Provider value={values}>
      {children}
    </DonationContext.Provider>
  );

  function validate() {
    return (
      birthday.validate() || consent.validate() || donationValue.validate()
    );
  }

  function selectDonateAnotherValue() {
    if (valueOptions.length < 2) {
      donationValue.set(200);
    } else {
      const v1 = valueOptions[valueOptions.length - 2];
      const v2 = valueOptions[valueOptions.length - 1];
      const value = Math.ceil((v1 + v2) / 2 / 10) * 10;
      donationValue.set(value);
    }
  }
  function selectOption() {
    if (valueOptions.length > 0) {
      if (valueOptions.length > 1) {
        donationValue.set(valueOptions[valueOptions.length - 2]);
      } else {
        donationValue.set(valueOptions[0]);
      }
    }
  }
}
