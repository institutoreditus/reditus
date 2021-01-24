// import * as messages from "../pages/strings/pt/messages.json";

const defaultLocale = "pt";

import * as messages from "../strings/${locale}/messages.json";

export async function getMessage(key: string) {

    if (messages[key]){
        return messages[key]
    }
    else {
        console.log(`Could not look up message with key ${key}`)
    }
}

console.log(getMessage("invalid_data"));
export default getMessage;