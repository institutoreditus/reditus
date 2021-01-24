import * as messages from "../strings/pt/messages.json";
// import * as messages from "../strings/${locale}/messages.json";


const defaultLocale = "pt";

async function getMessage(key: string) {
    var msg = await messages[key]
    
    if (!msg]){
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