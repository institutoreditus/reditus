import * as messages from "../strings/pt/messages.json";
// import * as messages from "../strings/${locale}/messages.json";

const defaultLocale = "pt";

 function getMessage(key: string) {
    
    if (key){
        return console.log(key)
    }
    else {
        console.log(`Could not look up message with key ${key}`)
    }
}

export default getMessage;