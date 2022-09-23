import { useState } from "react";



export default function useConsent () {

    const [privacyTermsAck, setPTA] = useState(false);
    const [consentLicitOrigin, setCLO] = useState(false);
    const [error, setError] = useState(false);

    return {
        privacyTermsAck, setPrivacyTermsAck,
        consentLicitOrigin, setConsentLicitOrigin,
        validate, error, clear
    };

    function validate() {
        let hasError = false;
        if (!privacyTermsAck || !consentLicitOrigin) {
            hasError = true;
        }
        setError(hasError);
        return hasError;
    }

    function clear() {
        setError(false);
    }


    function setPrivacyTermsAck(value: boolean) {
        setPTA(value);
        validate()
    }
    function setConsentLicitOrigin(value: boolean) {
        setCLO(value);
        validate()
    }

}

export const ConsentInit : ReturnType<typeof useConsent> = {
    privacyTermsAck: false, setPrivacyTermsAck: (value)=>{},
    consentLicitOrigin: false, setConsentLicitOrigin: (value)=>{},
    error: false,
    validate: () => true,
    clear: () => {},
}