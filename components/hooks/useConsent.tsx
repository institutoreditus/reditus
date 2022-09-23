import { useState } from "react";



export default function useConsent () {

    const [privacyTermsAck, setPTA] = useState(false);
    const [consentLicitOrigin, setCLO] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    return {
        privacyTermsAck, setPrivacyTermsAck,
        consentLicitOrigin, setConsentLicitOrigin,
        validate, error, clear
    };

    function validate() {
        let hasError = false;
        let message = '';
        if (!privacyTermsAck && !consentLicitOrigin) {
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
        if (!value || !consentLicitOrigin) {
            setError(true)
        } else {
            setError(false)
        }
    }
    function setConsentLicitOrigin(value: boolean) {
        setCLO(value);
        if (!value || !privacyTermsAck) {
            setError(true)
        } else {
            setError(false)
        }
    }

}

export const ConsentInit : ReturnType<typeof useConsent> = {
    privacyTermsAck: false, setPrivacyTermsAck: (value)=>{},
    consentLicitOrigin: false, setConsentLicitOrigin: (value)=>{},
    error: false,
    validate: () => true,
    clear: () => {},
}