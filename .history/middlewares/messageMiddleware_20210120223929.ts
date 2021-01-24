import * as messages from "../strings/pt/messages.json";
// import * as messages from "../strings/${locale}/messages.json";

const defaultLocale = "pt";

async function getMessage(key: string) {
    var msg = await key
    // console.log(msg)
    
    // if (!msg){
    //     console.log(`Could not look up message with key ${msg}`)
    // }
    // else{
    //     return msg
    // }
    
    if (msg){
        return msg
    }
    else {
        console.log(`Could not look up message with key ${msg}`)
    }
}

export default getMessage;