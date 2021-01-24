import * as messages from "../strings/pt/messages.json";
// import * as messages from "../strings/${locale}/messages.json";


const defaultLocale = "pt";

await function getMessage(key: string) {

    
    if (!messages[key]){
        console.log(`Could not look up message with key ${key}`)
    }
    else{
        return messages[key]
    }
    
//     if (messages[key]){
//         return messages[key]
//     }
//     else {
//         console.log(`Could not look up message with key ${key}`)
//     }
}

export default getMessage;