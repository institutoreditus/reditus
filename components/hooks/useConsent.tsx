import { useState } from "react";



export default function useConsent () {

    const [privacyTermsAck, setPrivacyTermsAck] = useState(false);
    const [consentLicitOrigin, setConsentLicitOrigin] = useState(false);
    const [error, setError] = useState(false);

    return {
        privacyTermsAck, setPrivacyTermsAck,
        consentLicitOrigin, setConsentLicitOrigin,
        validate, error, clear
    };

    function validate() {
        if (!privacyTermsAck || !consentLicitOrigin) {
            setError(true);
        }
    }

    function clear() {
        setError(false);
    }

}

export const ConsentInit : ReturnType<typeof useConsent> = {
    privacyTermsAck: false, setPrivacyTermsAck: (value)=>{},
    consentLicitOrigin: false, setConsentLicitOrigin: (value)=>{},
    error: false,
    validate: () => {},
    clear: () => {},
}